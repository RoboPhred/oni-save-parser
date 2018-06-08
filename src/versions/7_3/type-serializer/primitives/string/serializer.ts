import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { StringTypeDescriptor } from "./descriptor";

export const StringTypeSerializer = createSimpleSerializationInfo<
  string | null,
  StringTypeDescriptor
>(
  TypeID.String,
  "string",
  reader => reader.readKleiString(),
  (writer, value) => writer.writeKleiString(value)
);
