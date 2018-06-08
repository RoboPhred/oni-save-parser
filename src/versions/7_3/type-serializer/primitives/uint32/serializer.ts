import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { UInt32TypeDescriptor } from "./descriptor";

export const UInt32TypeSerializer = createSimpleSerializationInfo<
  number,
  UInt32TypeDescriptor
>(
  TypeID.UInt32,
  "int-32-unsigned",
  reader => reader.readUInt32(),
  (writer, value) => writer.writeUInt32(value)
);
