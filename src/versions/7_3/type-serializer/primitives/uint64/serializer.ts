import Long from "long";

import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { UInt64TypeDescriptor } from "./descriptor";

export const UInt64TypeSerializer = createSimpleSerializationInfo<
  Long,
  UInt64TypeDescriptor
>(
  TypeID.UInt64,
  "int-64-unsigned",
  reader => reader.readUInt64(),
  (writer, value) => writer.writeUInt64(value)
);
