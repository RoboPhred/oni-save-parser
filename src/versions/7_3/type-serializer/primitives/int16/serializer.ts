import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { Int16TypeDescriptor } from "./descriptor";

export const Int16TypeSerializer = createSimpleSerializationInfo<
  number,
  Int16TypeDescriptor
>(
  TypeID.Int16,
  "int-16",
  reader => reader.readInt16(),
  (writer, value) => writer.writeInt16(value)
);
