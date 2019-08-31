import {
  TypeInfo,
  SerializationTypeInfo,
  GENERIC_TYPES,
  getTypeCode,
  SerializationTypeCode
} from "../../save-structure/type-templates";

import {
  ParseIterator,
  UnparseIterator,
  readKleiString,
  readByte,
  writeKleiString,
  writeByte
} from "../../parser";

export function* parseTypeInfo(): ParseIterator<TypeInfo> {
  const info: SerializationTypeInfo = yield readByte();
  const type = getTypeCode(info);

  let templateName: string | undefined;
  let subTypes: TypeInfo[] | undefined;

  if (
    type === SerializationTypeCode.UserDefined ||
    type === SerializationTypeCode.Enumeration
  ) {
    const userTypeName = yield readKleiString();
    if (userTypeName == null) {
      throw new Error(
        "Expected non-null type name for user-defined or enumeration type."
      );
    }
    templateName = userTypeName;
  }

  if (info & SerializationTypeInfo.IS_GENERIC_TYPE) {
    if (GENERIC_TYPES.indexOf(type) === -1) {
      throw new Error(
        `Unsupported non-generic type ${type} marked as generic.`
      );
    }
    const subTypeCount: number = yield readByte();
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
    templateName,
    subTypes
  };
  return typeInfo;
}

export function* unparseTypeInfo(info: TypeInfo): UnparseIterator {
  yield writeByte(info.info);
  const type = getTypeCode(info.info);
  if (
    type === SerializationTypeCode.UserDefined ||
    type === SerializationTypeCode.Enumeration
  ) {
    yield writeKleiString(info.templateName!);
  }

  if (info.info & SerializationTypeInfo.IS_GENERIC_TYPE) {
    yield writeByte(info.subTypes!.length);
    for (const subType of info.subTypes!) {
      yield* unparseTypeInfo(subType);
    }
  } else if (type === SerializationTypeCode.Array) {
    yield* unparseTypeInfo(info.subTypes![0]);
  }
}
