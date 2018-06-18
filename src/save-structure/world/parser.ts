import {
  TemplateParser,
  TemplateUnparser
} from "../type-templates/template-data-parser";
import {
  ParseIterator,
  UnparseIterator,
  readKleiString,
  writeKleiString
} from "../../parser";

import { validateDotNetIdentifierName } from "../../utils";

import { SaveGameWorld } from "./world";

const AssemblyTypeName = "Klei.SaveFileRoot";

export function* parseWorld({
  parseByTemplate
}: TemplateParser): ParseIterator<SaveGameWorld> {
  const typeName = yield readKleiString();
  validateDotNetIdentifierName(typeName);
  if (typeName !== AssemblyTypeName) {
    throw new Error(
      `Expected type name "${AssemblyTypeName}" but got "${typeName}".`
    );
  }

  const world = yield* parseByTemplate<SaveGameWorld>(AssemblyTypeName);
  return world;
}

export function* unparseWorld(
  world: SaveGameWorld,
  { unparseByTemplate }: TemplateUnparser
): UnparseIterator {
  yield writeKleiString(AssemblyTypeName);
  yield* unparseByTemplate(AssemblyTypeName, world);
}
