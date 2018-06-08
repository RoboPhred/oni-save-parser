import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { Int32TypeDescriptor } from "./descriptor";

export const Int32TypeSerializer = createSimpleSerializationInfo<
  number,
  Int32TypeDescriptor
>(
  TypeID.Int32,
  "int-32",
  reader => reader.readInt32(),
  (writer, value) => writer.writeInt32(value)
);
