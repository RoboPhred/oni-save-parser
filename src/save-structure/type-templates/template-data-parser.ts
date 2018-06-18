import { ParseIterator, UnparseIterator } from "../../parser";
import { TypeTemplates } from "../../save-structure/type-templates";
import { parseByType, unparseByType } from "./type-data-parser";

export interface TemplateParser {
  parseByTemplate<T>(templateName: string): ParseIterator<T>;
}
export interface TemplateUnparser {
  unparseByTemplate<T>(templateName: string, value: T): UnparseIterator;
}

export function* parseByTemplate<T>(
  templates: TypeTemplates,
  templateName: string
): ParseIterator<T> {
  const template = templates.find(x => x.name === templateName);
  if (!template) {
    throw new Error(`Template "${templateName}" not found.`);
  }

  const result: any = {};

  for (let field of template.fields) {
    const { name, type } = field;
    const value = yield* parseByType(type, templates);
    result[name] = value;
  }

  for (let prop of template.properties) {
    const { name, type } = prop;
    const value = yield* parseByType(type, templates);
    result[name] = value;
  }

  return result;
}

export function* unparseByTemplate<T>(
  templates: TypeTemplates,
  templateName: string,
  obj: T
): UnparseIterator {
  const template = templates.find(x => x.name === templateName);
  if (!template) {
    throw new Error(`Template "${templateName}" not found.`);
  }

  for (let field of template.fields) {
    const { name, type } = field;
    const value = (obj as any)[name];
    yield* unparseByType(value, type, templates);
  }

  for (let prop of template.properties) {
    const { name, type } = prop;
    const value = (obj as any)[name];
    yield* unparseByType(value, type, templates);
  }
}
