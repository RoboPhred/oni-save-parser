import {
  ParseIterator,
  UnparseIterator,
  readInt32,
  writeInt32,
  readKleiString,
  writeKleiString
} from "../../parser";

import {
  TypeTemplates,
  TypeTemplateMember,
  TypeTemplate
} from "../../save-structure/type-templates";

import { validateDotNetIdentifierName } from "../../utils";

import { parseTypeInfo, unparseTypeInfo } from "./type-info-parser";

export function* parseTemplates(): ParseIterator<TypeTemplates> {
  const templateCount = yield readInt32();
  const templates: TypeTemplates = new Array(templateCount);
  for (let i = 0; i < templateCount; i++) {
    const template = yield* parseTemplate();
    templates[i] = template;
  }
  return templates;
}

export function* unparseTemplates(templates: TypeTemplates): UnparseIterator {
  yield writeInt32(templates.length);
  for (const template of templates) {
    yield* unparseTemplate(template);
  }
}

function* parseTemplate(): ParseIterator<TypeTemplate> {
  const name = validateDotNetIdentifierName(yield readKleiString());

  const fieldCount = yield readInt32();
  const propCount = yield readInt32();

  const fields: TypeTemplateMember[] = new Array(fieldCount);
  for (let i = 0; i < fieldCount; i++) {
    const name = validateDotNetIdentifierName(yield readKleiString());
    const type = yield* parseTypeInfo();
    fields[i] = {
      name,
      type
    };
  }

  const properties: TypeTemplateMember[] = new Array(propCount);
  for (let i = 0; i < propCount; i++) {
    const name = validateDotNetIdentifierName(yield readKleiString());
    const type = yield* parseTypeInfo();
    properties[i] = {
      name,
      type
    };
  }

  const template: TypeTemplate = {
    name,
    fields,
    properties
  };
  return template;
}

function* unparseTemplate(template: TypeTemplate) {
  yield writeKleiString(template.name);

  yield writeInt32(template.fields.length);
  yield writeInt32(template.properties.length);

  for (const field of template.fields) {
    const { name, type } = field;
    yield writeKleiString(name);
    yield* unparseTypeInfo(type);
  }

  for (const prop of template.properties) {
    const { name, type } = prop;
    yield writeKleiString(name);
    yield* unparseTypeInfo(type);
  }
}
