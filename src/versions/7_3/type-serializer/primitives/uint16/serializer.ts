import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { UInt16TypeDescriptor } from "./descriptor";

export const UInt16TypeSerializer = createSimpleSerializationInfo<
  number,
  UInt16TypeDescriptor
>(
  TypeID.UInt16,
  "int-16-unsigned",
  reader => reader.readUInt16(),
  (writer, value) => writer.writeUInt16(value)
);
