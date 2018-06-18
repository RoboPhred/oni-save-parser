import { TemplateParser, TemplateUnparser } from "./templates";
import {
  ParseIterator,
  UnparseIterator,
  readKleiString,
  writeKleiString
} from "../parser";
import { SaveGameWorld } from "../save-structure/world";
import { validateDotNetIdentifierName } from "../utils";

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

export function* writeWorld(
  world: SaveGameWorld,
  { unparseByTemplate }: TemplateUnparser
): UnparseIterator {
  yield writeKleiString(AssemblyTypeName);
  yield* unparseByTemplate(AssemblyTypeName, world);
}
