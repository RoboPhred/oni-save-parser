import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { SingleTypeDescriptor } from "./descriptor";

export const SingleTypeSerializer = createSimpleSerializationInfo<
  number,
  SingleTypeDescriptor
>(
  TypeID.Single,
  "single",
  reader => reader.readSingle(),
  (writer, value) => writer.writeSingle(value)
);
