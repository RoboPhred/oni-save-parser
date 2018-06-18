import { SaveGameSettings } from "../save-structure/save-settings";
import {
  ParseIterator,
  UnparseIterator,
  readKleiString,
  writeKleiString
} from "../parser";
import { TemplateParser, TemplateUnparser } from "./templates";
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
  { unparseByTemplate }: TemplateUnparser
): UnparseIterator {
  yield writeKleiString(AssemblyTypeName);
  yield* unparseByTemplate(AssemblyTypeName, settings);
}
