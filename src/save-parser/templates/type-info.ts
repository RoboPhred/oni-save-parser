import {
  TypeTemplates,
  TypeTemplate,
  TypeTemplateMember,
  TypeInfo,
  SerializationTypeInfo,
  GENERIC_TYPES,
  getTypeCode,
  SerializationTypeCode
} from "../../save-structure/type-templates";

import { validateDotNetIdentifierName } from "../../utils";

import {
  ParseIterator,
  readInt32,
  readKleiString,
  readByte,
  WriteIterator,
  writeInt32,
  writeKleiString,
  writeByte
} from "../../parser";

export function* parseTemplates(): ParseIterator<TypeTemplates> {
  const templateCount = yield readInt32();
  const templates: TypeTemplates = new Array(templateCount);
  for (let i = 0; i < templateCount; i++) {
    const template = yield* parseTemplate();
    templates[i] = template;
  }
  return templates;
}

export function* writeTemplates(templates: TypeTemplates): WriteIterator {
  yield writeInt32(templates.length);
  for (const template of templates) {
    yield* writeTemplate(template);
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

function* writeTemplate(template: TypeTemplate) {
  yield writeKleiString(template.name);

  yield writeInt32(template.fields.length);
  yield writeInt32(template.properties.length);

  for (const field of template.fields) {
    const { name, type } = field;
    yield writeKleiString(name);
    yield* writeTypeInfo(type);
  }

  for (const prop of template.properties) {
    const { name, type } = prop;
    yield writeKleiString(name);
    yield* writeTypeInfo(type);
  }
}

function* parseTypeInfo(): ParseIterator<TypeInfo> {
  const info: SerializationTypeInfo = yield readByte();
  const type = getTypeCode(info);

  let typeName: string | undefined;
  let subTypes: TypeInfo[] | undefined;

  if (
    type === SerializationTypeCode.UserDefined ||
    type === SerializationTypeCode.Enumeration
  ) {
    const userTypeName = yield readKleiString();
    if (userTypeName === null) {
      throw new Error(
        "Expected non-null type name for user-defined or enumeration type."
      );
    }
    typeName = userTypeName;
  }

  if (info & SerializationTypeInfo.IS_GENERIC_TYPE) {
    if (GENERIC_TYPES.indexOf(type) === -1) {
      throw new Error(
        `Unsupported non-generic type ${type} marked as generic.`
      );
    }
    const subTypeCount = yield readByte();
    subTypes = new Array(subTypeCount);
    for (let i = 0; i < subTypeCount; i++) {
      subTypes[i] = yield* parseTypeInfo();
    }
  } else if (type === SerializationTypeCode.Array) {
    const subType = yield* parseTypeInfo();
    subTypes = [subType];
  }

  const typeInfo: TypeInfo = {
    info,
    typeName,
    subTypes
  };
  return typeInfo;
}

function* writeTypeInfo(info: TypeInfo): WriteIterator {
  yield writeByte(info.info);
  const type = getTypeCode(info.info);
  if (
    type === SerializationTypeCode.UserDefined ||
    type === SerializationTypeCode.Enumeration
  ) {
    yield writeKleiString(info.typeName!);
  }

  if (info.info & SerializationTypeInfo.IS_GENERIC_TYPE) {
    yield writeByte(info.subTypes!.length);
    for (const subType of info.subTypes!) {
      yield* writeTypeInfo(subType);
    }
  } else if (type === SerializationTypeCode.Array) {
    yield* writeTypeInfo(info.subTypes![0]);
  }
}
