import { DataReader } from "../binary-serializer";
import {
  TypeTemplates,
  TypeTemplate,
  TypeTemplateMember,
  TypeInfo,
  SerializationTypeInfo,
  GENERIC_TYPES
} from "../save-structure/type-templates";

import { validateDotNetIdentifierName } from "../utils";

export function parseTemplates(reader: DataReader): TypeTemplates {
  const templateCount = reader.readInt32();
  const templates: TypeTemplates = new Array(templateCount);
  for (let i = 0; i < templateCount; i++) {
    const template = parseTemplate(reader);
    templates[i] = template;
  }
  return templates;
}

function parseTemplate(reader: DataReader): TypeTemplate {
  const name = validateDotNetIdentifierName(reader.readKleiString());

  const fieldCount = reader.readInt32();
  const propCount = reader.readInt32();

  const fields: TypeTemplateMember[] = new Array(fieldCount);
  for (let i = 0; i < fieldCount; i++) {
    const name = validateDotNetIdentifierName(reader.readKleiString());
    const type = parseTypeInfo(reader);
    fields[i] = {
      name,
      type
    };
  }

  const properties: TypeTemplateMember[] = new Array(propCount);
  for (let i = 0; i < propCount; i++) {
    const name = validateDotNetIdentifierName(reader.readKleiString());
    const type = parseTypeInfo(reader);
    properties[i] = {
      name,
      type
    };
  }

  return {
    name,
    fields,
    properties
  };
}

function parseTypeInfo(reader: DataReader): TypeInfo {
  const info: SerializationTypeInfo = reader.readByte();
  const type = info & SerializationTypeInfo.VALUE_MASK;

  let typeName: string | undefined;
  let subTypes: TypeInfo[] | undefined;

  if (
    type === SerializationTypeInfo.UserDefined ||
    type === SerializationTypeInfo.Enumeration
  ) {
    const userTypeName = reader.readKleiString();
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
    const subTypeCount = reader.readByte();
    subTypes = new Array(subTypeCount);
    for (let i = 0; i < subTypeCount; i++) {
      subTypes[i] = parseTypeInfo(reader);
    }
  } else if (type === SerializationTypeInfo.Array) {
    const subType = parseTypeInfo(reader);
    subTypes = [subType];
  }

  return {
    info,
    typeName,
    subTypes
  };
}
