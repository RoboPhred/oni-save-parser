import { Logger } from "../../../logging";
import { ParseStepExecutor } from "../../../parse-steps";
import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameObjectManager } from "../services";
import { GameObjectPrefabs } from "../interfaces";
export declare class GameObjectManagerImpl implements GameObjectManager {
    private _templateSerializer;
    private _stepExecutor;
    private _gameObjects;
    private _gameObjectOrdering;
    private _warnExtraniousDataTypes;
    private _logWarn;
    constructor(_templateSerializer: TypeTemplateSerializer, _stepExecutor: ParseStepExecutor, logger?: Logger);
    readonly gameObjects: GameObjectPrefabs;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    fromJSON(gameObjects: GameObjectPrefabs): void;
    toJSON(): GameObjectPrefabs;
    private _parsePrefabs(reader);
    private _writePrefabs(writer);
    private _parsePrefabSet(reader, prefabName);
    private _writePrefabSet(writer, prefabName, prefabObjects);
    private _parseGameObject(reader);
    private _writeGameObject(writer, gameObject);
    private _parseGameObjectBehavior(reader);
    private _deserializeGameObjectBehavior(reader, name, dataLength);
    private _writeGameObjectBehavior(writer, behavior);
}
