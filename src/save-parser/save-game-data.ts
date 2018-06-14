import { TemplateParser } from "./templates/type-parser";
import { ParseIterator, readKleiString } from "../parser";
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
