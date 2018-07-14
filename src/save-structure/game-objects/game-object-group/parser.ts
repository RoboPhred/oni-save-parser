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

import taggedParser from "../../../tagger/parse-tagger";
import { reportProgress } from "../../../progress";

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

  return yield* parseNamedGameObjectGroup(prefabName, templateParser);
}

const parseNamedGameObjectGroup = taggedParser(
  "GameObjectGroup",
  prefabName => prefabName,
  function*(
    prefabName: string,
    templateParser: TemplateParser
  ): ParseIterator<GameObjectGroup> {
    const instanceCount = yield readInt32();
    const dataLength = yield readInt32();
    const preParsePosition = yield getReaderPosition();

    const gameObjects: GameObject[] = new Array(instanceCount);
    for (let i = 0; i < instanceCount; i++) {
      yield reportProgress(`GameObjectGroup::${prefabName}::${i}`);
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
);

export function* unparseGameObjectGroup(
  group: GameObjectGroup,
  templateUnparser: TemplateUnparser
): UnparseIterator {
  yield* unparseTaggedGameObjectGroup(group, templateUnparser);
}

const unparseTaggedGameObjectGroup = taggedParser(
  "GameObjectGroup",
  group => group.name,
  function*(
    group: GameObjectGroup,
    templateUnparser: TemplateUnparser
  ): UnparseIterator {
    const { name, gameObjects } = group;
    yield writeKleiString(name);
    yield writeInt32(gameObjects.length);

    const lengthToken = yield writeDataLengthBegin();
    for (let i = 0; i < gameObjects.length; i++) {
      const gameObject = gameObjects[i];
      yield reportProgress(`GameObjectGroup::${name}::${i}`);
      yield* unparseGameObject(gameObject, templateUnparser);
    }

    yield writeDataLengthEnd(lengthToken);
  }
);
