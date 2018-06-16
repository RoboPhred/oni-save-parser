import { TemplateParser, TemplateWriter } from "./templates/type-parser";
import {
  readKleiString,
  ParseIterator,
  WriteIterator,
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
  { writeByTemplate }: TemplateWriter
): WriteIterator {
  yield writeKleiString(AssemblyTypeName);
  yield* writeByTemplate(AssemblyTypeName, world);
}
