import {
  ParseIterator,
  UnparseIterator,
  readKleiString,
  writeKleiString
} from "../../parser";

import {
  TemplateParser,
  TemplateUnparser
} from "../type-templates/template-data-parser";

import { validateDotNetIdentifierName } from "../../utils";

import { SaveGameSettings } from "./settings";

const AssemblyTypeName = "Game+Settings";

export function* parseSettings({
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

export function* unparseSettings(
  settings: SaveGameSettings,
  { unparseByTemplate }: TemplateUnparser
): UnparseIterator {
  yield writeKleiString(AssemblyTypeName);
  yield* unparseByTemplate(AssemblyTypeName, settings);
}
