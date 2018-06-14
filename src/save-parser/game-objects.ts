import {
  readInt32,
  ParseIterator,
  readKleiString,
  getReaderPosition,
  readByte,
  readBytes
} from "../parser";

import {
  GameObjectGroup,
  GameObject,
  GameObjectBehavior
} from "../save-structure";

import { validateDotNetIdentifierName } from "../utils";
import { TemplateParser } from "./templates/type-parser";
import { parseVector3, parseQuaternion } from "../data-types";

export function* parseGameObjects(
  templateParser: TemplateParser
): ParseIterator<GameObjectGroup[]> {
  const count = yield readInt32();
  const groups: GameObjectGroup[] = new Array(count);
  for (let i = 0; i < count; i++) {
    groups[i] = yield* parseGameObjectPrefabSet(templateParser);
  }
  return groups;
}

function* parseGameObjectPrefabSet(
  templateParser: TemplateParser
): ParseIterator<GameObjectGroup> {
  const prefabName = yield readKleiString();
  validateDotNetIdentifierName(prefabName);

  const instanceCount = yield readInt32();
  const dataLength = yield readInt32();
  const preParsePosition = yield getReaderPosition();

  const gameObjects: GameObject[] = new Array(instanceCount);
  for (let i = 0; i < instanceCount; i++) {
    gameObjects[i] = yield* parseGameObject(templateParser);
  }

  const postParsePosition = yield getReaderPosition();
  const bytesRemaining = dataLength - (postParsePosition - preParsePosition);
  if (bytesRemaining < 0) {
    throw new Error(
      `GameObject "${prefabName}" parse consumed ${-bytesRemaining} more bytes than its declared length of ${dataLength}.`
    );
  } else if (bytesRemaining > 0) {
    // We could skip the bytes, but if we want to write data back, we better know what those bytes were.
    //  Each GameObject itself tracks data length, so we should be covered.  Anything that is missing
    //  is a sign of a parse issue.
    throw new Error(
      `GameObject "${prefabName}" parse consumed ${bytesRemaining} less bytes than its declared length of ${dataLength}.`
    );
  }

  const group: GameObjectGroup = {
    name: prefabName,
    gameObjects
  };

  return group;
}

function* parseGameObject(
  templateParser: TemplateParser
): ParseIterator<GameObject> {
  const position = yield* parseVector3();
  const rotation = yield* parseQuaternion();
  const scale = yield* parseVector3();
  const folder = yield readByte();

  const behaviorCount = yield readInt32();

  const behaviors: GameObjectBehavior[] = new Array(behaviorCount);
  for (let i = 0; i < behaviorCount; i++) {
    behaviors[i] = yield* parseGameObjectBehavior(templateParser);
  }

  const gameObject: GameObject = {
    position,
    rotation,
    scale,
    folder,
    behaviors
  };

  return gameObject;
}

function* parseGameObjectBehavior({
  parseByTemplate
}: TemplateParser): ParseIterator<GameObjectBehavior> {
  const name = yield readKleiString();
  validateDotNetIdentifierName(name);

  const dataLength = yield readInt32();
  const preParsePosition = yield getReaderPosition();

  const templateData = yield* parseByTemplate(name);

  let extraRaw: ArrayBuffer | undefined = undefined;

  const postParsePosition = yield getReaderPosition();
  const dataRemaining = dataLength - (postParsePosition - preParsePosition);
  if (dataRemaining < 0) {
    throw new Error(
      `GameObjectBehavior "${name}" deserialized more type data than expected.`
    );
  } else if (dataRemaining > 0) {
    //  TODO: Implement extra data parsing for specific behaviors that implement ISaveLoadableDetails.
    extraRaw = yield readBytes(dataRemaining);
  }

  const behavior: GameObjectBehavior = {
    name,
    templateData,
    extraRaw
  };
  return behavior;
}
