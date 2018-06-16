import { SaveGameSettings } from "../save-structure/save-settings";
import {
  ParseIterator,
  readKleiString,
  WriteIterator,
  writeKleiString
} from "../parser";
import { TemplateParser, TemplateWriter } from "./templates/type-parser";
import { validateDotNetIdentifierName } from "../utils";

const AssemblyTypeName = "Game+Settings";

export function* parseSaveSettings({
  parseByTemplate
}: TemplateParser): ParseIterator<SaveGameSettings> {
  const typeName = yield readKleiString();
  validateDotNetIdentifierName(typeName);
  if (typeName !== AssemblyTypeName) {
    throw new Error(
      `Expected type name "${AssemblyTypeName}" but got "${typeName}".`
    );
  }

  return yield* parseByTemplate(AssemblyTypeName);
}

export function* writeSaveSettings(
  settings: SaveGameSettings,
  { writeByTemplate }: TemplateWriter
): WriteIterator {
  yield writeKleiString(AssemblyTypeName);
  yield* writeByTemplate(AssemblyTypeName, settings);
}
