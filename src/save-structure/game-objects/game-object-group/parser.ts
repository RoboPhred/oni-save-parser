import { validateDotNetIdentifierName } from "../../../utils";

import {
  ParseIterator,
  readKleiString,
  readInt32,
  getReaderPosition,
  UnparseIterator,
  writeKleiString,
  writeInt32,
  writeDataLengthBegin,
  writeDataLengthEnd
} from "../../../parser";

import {
  TemplateParser,
  TemplateUnparser
} from "../../type-templates/template-data-parser";

import { GameObject } from "../game-object";
import { parseGameObject, unparseGameObject } from "../game-object/parser";

import { GameObjectGroup } from "./game-object-group";

export function* parseGameObjectGroup(
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

export function* unparseGameObjectGroup(
  gameObjectGroup: GameObjectGroup,
  templateWriter: TemplateUnparser
): UnparseIterator {
  const { name, gameObjects } = gameObjectGroup;
  yield writeKleiString(name);
  yield writeInt32(gameObjects.length);

  const lengthToken = yield writeDataLengthBegin();
  for (const gameObject of gameObjects) {
    yield* unparseGameObject(gameObject, templateWriter);
  }

  yield writeDataLengthEnd(lengthToken);
}
