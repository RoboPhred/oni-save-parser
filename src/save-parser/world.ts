import { TemplateParser } from "./templates/type-parser";
import { readKleiString, ParseIterator } from "../parser";
import { SaveGameWorld } from "../save-structure/world";

const AssemblyTypeName = "Klei.SaveFileRoot";

export function* parseWorld({
  parseByTemplate
}: TemplateParser): ParseIterator<SaveGameWorld> {
  const str = yield readKleiString();
  if (str !== AssemblyTypeName) {
    throw new Error(
      `Expected type name "${AssemblyTypeName}" but got "${str}".`
    );
  }

  const world = yield* parseByTemplate<SaveGameWorld>(AssemblyTypeName);
  return world;
}
