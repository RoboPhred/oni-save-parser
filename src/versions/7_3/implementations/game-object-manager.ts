import { inject, injectable, inScope, optional } from "microinject";

import { validateDotNetIdentifierName } from "../../../utils";

import { Logger } from "../../../logging";

import { ParseStepExecutor } from "../../../parse-steps";

import {
  ArrayDataWriter,
  DataReader,
  DataWriter
} from "../../../binary-serializer";

import { TypeTemplateSerializer } from "../type-serializer";

import { GameObjectManager, SaveGameScope } from "../services";

import {
  GameObject,
  GameObjectBehavior,
  GameObjectPrefabs
} from "../interfaces";

@injectable(GameObjectManager)
@inScope(SaveGameScope)
export class GameObjectManagerImpl implements GameObjectManager {
  private _gameObjects: GameObjectPrefabs = {};
  private _gameObjectOrdering: string[] = [];

  private _warnExtraniousDataTypes = new Set<string>();

  private _logWarn: Logger["warn"];

  constructor(
    @inject(TypeTemplateSerializer)
    private _templateSerializer: TypeTemplateSerializer,
    @inject(ParseStepExecutor) private _stepExecutor: ParseStepExecutor,
    @inject(Logger)
    @optional()
    logger?: Logger
  ) {
    if (logger) {
      this._logWarn = logger.warn.bind(logger);
    } else {
      this._logWarn = () => {};
    }
  }

  get gameObjects(): GameObjectPrefabs {
    return this._gameObjects;
  }

  parse(reader: DataReader): void {
    this._parsePrefabs(reader);
  }

  write(writer: DataWriter): void {
    this._writePrefabs(writer);
  }

  fromJSON(gameObjects: GameObjectPrefabs) {
    this._gameObjects = gameObjects;
    // TODO: Amend ordering based on new or removed keys rather than
    //  loosing the order.
    this._gameObjectOrdering = Object.keys(gameObjects);
  }

  toJSON(): GameObjectPrefabs {
    return { ...this._gameObjects };
  }

  private _parsePrefabs(reader: DataReader) {
    const prefabCount = reader.readInt32();
    this._stepExecutor.for("prefabs", prefabCount, () => {
      const prefabName = validatePrefabName(reader.readKleiString());
      this._gameObjectOrdering.push(prefabName);

      const prefabSet = this._parsePrefabSet(reader, prefabName);

      this.gameObjects[prefabName] = prefabSet;
    });
  }

  private _writePrefabs(writer: DataWriter) {
    writer.writeInt32(this._gameObjectOrdering.length);
    this._stepExecutor.forEach("prefabs", this._gameObjectOrdering, name => {
      writer.writeKleiString(name);
      const prefab = this.gameObjects[name]!;
      this._writePrefabSet(writer, name, prefab);
    });
  }

  private _parsePrefabSet(
    reader: DataReader,
    prefabName: string
  ): GameObject[] {
    const instanceCount = reader.readInt32();
    const dataLength = reader.readInt32();
    const preParsePosition = reader.position;

    const prefabObjects = this._stepExecutor.for(
      prefabName,
      instanceCount,
      () => this._parseGameObject(reader)
    );

    const bytesRemaining = dataLength - (reader.position - preParsePosition);
    if (bytesRemaining < 0) {
      throw new Error(
        `Prefab "${prefabName}" parse consumed ${-bytesRemaining} more bytes than its declared length of ${dataLength}.`
      );
    } else if (bytesRemaining > 0) {
      // We could skip the bytes, but if we want to write data back, we better know what those bytes were.
      //  Each GameObject itself tracks data length, so we should be covered.  Anything that is missing
      //  is a sign of a parse issue.
      throw new Error(
        `Prefab "${prefabName}" parse consumed ${bytesRemaining} less bytes than its declared length of ${dataLength}.`
      );
    }

    return prefabObjects;
  }

  private _writePrefabSet(
    writer: DataWriter,
    prefabName: string,
    prefabObjects: GameObject[]
  ) {
    // We need to know the data length.
    //  Write the data to another buffer, so we can
    //  figure out its length and write its data out.
    const setWriter = new ArrayDataWriter();
    this._stepExecutor.forEach(prefabName, prefabObjects, gameObject =>
      this._writeGameObject(setWriter, gameObject)
    );

    const gameObjectData = setWriter.getBytesView();

    writer.writeInt32(prefabObjects.length);
    writer.writeInt32(gameObjectData.byteLength);
    writer.writeBytes(gameObjectData);
  }

  private _parseGameObject(reader: DataReader): GameObject {
    const position = reader.readVector3();
    const rotation = reader.readQuaternion();
    const scale = reader.readVector3();
    const folder = reader.readByte();

    const behaviorCount = reader.readInt32();

    const behaviors = this._stepExecutor.for("behaviors", behaviorCount, () =>
      this._parseGameObjectBehavior(reader)
    );

    return {
      position,
      rotation,
      scale,
      folder,
      behaviors
    };
  }

  private _writeGameObject(writer: DataWriter, gameObject: GameObject) {
    const { position, rotation, scale, folder, behaviors } = gameObject;

    writer.writeVector3(position);
    writer.writeQuaternion(rotation);
    writer.writeVector3(scale);
    writer.writeByte(folder);

    writer.writeInt32(behaviors.length);
    this._stepExecutor.forEach("behaviors", behaviors, behavior =>
      this._writeGameObjectBehavior(writer, behavior)
    );
  }

  private _parseGameObjectBehavior(reader: DataReader): GameObjectBehavior {
    const name = validateBehaviorName(reader.readKleiString());
    const dataLength = reader.readInt32();

    return this._stepExecutor.do(name, () =>
      this._deserializeGameObjectBehavior(reader, name, dataLength)
    );
  }

  private _deserializeGameObjectBehavior(
    reader: DataReader,
    name: string,
    dataLength: number
  ): GameObjectBehavior {
    const preParsePosition = reader.position;

    if (!this._templateSerializer.has(name)) {
      this._logWarn(
        `GameObjectBehavior "${name} could not be found in the type directory.  Storing remaining data as extraData.`
      );
      return {
        name,
        templateRecognized: false,
        extraData: reader.readBytes(dataLength)
      };
    }

    const parsedData = this._templateSerializer.parseTemplatedType(
      reader,
      name
    );
    let extraData: ArrayBuffer | undefined = undefined;

    const dataRemaining = dataLength - (reader.position - preParsePosition);
    if (dataRemaining < 0) {
      throw new Error(
        `GameObjectBehavior "${name}" deserialized more type data than expected.`
      );
    } else if (dataRemaining > 0) {
      //  TODO: Implement extra data parsing for specific behaviors that implement ISaveLoadableDetails.

      if (!this._warnExtraniousDataTypes.has(name)) {
        this._warnExtraniousDataTypes.add(name);
        this._logWarn(
          `GameObjectBehavior "${name}" has extra data.  This object should be inspected for a ISaveLoadableDetails implementation.`
        );
      }

      extraData = reader.readBytes(dataRemaining);
    }

    return {
      name,
      templateRecognized: true,
      parsedData,
      extraData
    };
  }

  private _writeGameObjectBehavior(
    writer: DataWriter,
    behavior: GameObjectBehavior
  ): void {
    const { name, parsedData, extraData } = behavior;

    writer.writeKleiString(name);

    this._stepExecutor.do(name, () => {
      var dataWriter = new ArrayDataWriter();

      if (parsedData != null) {
        this._templateSerializer.writeTemplatedType(
          dataWriter,
          name,
          parsedData
        );
      }

      if (extraData) {
        dataWriter.writeBytes(extraData);
      }

      writer.writeInt32(dataWriter.position);
      writer.writeBytes(dataWriter.getBytesView());
    });
  }
}

/**
 * Check if we parsed a meaningful prefab name.
 * @param name The name to validate.
 */
function validatePrefabName(name: string | null | undefined): string {
  return validateDotNetIdentifierName(name);
}

/**
 * Check if we parsed a meaningful prefab name.
 * @param name The name to validate.
 */
function validateBehaviorName(name: string | null | undefined): string {
  return validateDotNetIdentifierName(name);
}

function gameObjectToJson(this: GameObject) {
  return {
    position: this.position,
    rotation: this.rotation,
    scale: this.scale,
    folder: this.folder,
    behaviors: this.behaviors
  };
}
