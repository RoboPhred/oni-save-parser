import {
  ParseIterator,
  UnparseIterator,
  getReaderPosition,
  readKleiString,
  readInt32,
  writeDataLengthBegin,
  writeDataLengthEnd,
  writeKleiString,
  writeInt32
} from "../../parser";

import { validateDotNetIdentifierName } from "../../utils";

import {
  TemplateParser,
  TemplateUnparser
} from "../type-templates/template-data-parser";

import { GameObjectGroup, GameObject } from "./game-objects";

import { parseGameObject, unparseGameObject } from "./game-object-parser";

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

export function* unparseGameObjects(
  groups: GameObjectGroup[],
  templateWriter: TemplateUnparser
): UnparseIterator {
  yield writeInt32(groups.length);
  for (const group of groups) {
    yield* unparseGameObjectPrefabSet(group, templateWriter);
  }
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

function* unparseGameObjectPrefabSet(
  group: GameObjectGroup,
  templateWriter: TemplateUnparser
): UnparseIterator {
  const { name, gameObjects } = group;
  yield writeKleiString(name);
  yield writeInt32(gameObjects.length);

  const lengthToken = yield writeDataLengthBegin();
  for (const gameObject of gameObjects) {
    yield* unparseGameObject(gameObject, templateWriter);
  }

  yield writeDataLengthEnd(lengthToken);
}
