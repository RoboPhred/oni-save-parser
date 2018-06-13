import {
  TypeTemplates,
  TypeTemplate,
  TypeTemplateMember,
  TypeInfo,
  SerializationTypeInfo,
  GENERIC_TYPES
} from "../save-structure/type-templates";

import { validateDotNetIdentifierName } from "../utils";
import { readInt32, readKleiString, readByte } from "../parser";

export function* parseTemplates(): IterableIterator<any> {
  const templateCount = yield readInt32();
  const templates: TypeTemplates = new Array(templateCount);
  for (let i = 0; i < templateCount; i++) {
    const template = yield* parseTemplate();
    templates[i] = template;
  }
  return templates;
}

function* parseTemplate(): IterableIterator<any> {
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

function* parseTypeInfo(): IterableIterator<any> {
  const info: SerializationTypeInfo = yield readByte();
  const type = info & SerializationTypeInfo.VALUE_MASK;

  let typeName: string | undefined;
  let subTypes: TypeInfo[] | undefined;

  if (
    type === SerializationTypeInfo.UserDefined ||
    type === SerializationTypeInfo.Enumeration
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
  } else if (type === SerializationTypeInfo.Array) {
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
