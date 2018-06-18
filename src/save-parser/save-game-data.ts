import { TemplateParser, TemplateUnparser } from "./templates";
import {
  ParseIterator,
  UnparseIterator,
  readKleiString,
  writeKleiString
} from "../parser";
import { validateDotNetIdentifierName } from "../utils";
import { SaveGameData } from "../save-structure";

const AssemblyTypeName = "Game+GameSaveData";

export function* parseGameData({
  parseByTemplate
}: TemplateParser): ParseIterator<SaveGameData> {
  const typeName = yield readKleiString();
  validateDotNetIdentifierName(typeName);
  if (typeName !== AssemblyTypeName) {
    throw new Error(
      `Expected type name "${AssemblyTypeName}" but got "${typeName}".`
    );
  }

  const gameData = yield* parseByTemplate<SaveGameData>(AssemblyTypeName);
  return gameData;
}

export function* writeGameData(
  gameData: SaveGameData,
  { unparseByTemplate }: TemplateUnparser
): UnparseIterator {
  yield writeKleiString(AssemblyTypeName);
  yield* unparseByTemplate(AssemblyTypeName, gameData);
}
