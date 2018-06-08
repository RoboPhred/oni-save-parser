import { Vector3 } from "../../../../../interfaces";

import { TypeDescriptor, TypeID } from "../../interfaces";

import { TypeSerializationInfo } from "../../services";

import { createSimpleSerializationInfo } from "../simple-serializer";

import { Vector3TypeDescriptor } from "./descriptor";

export const Vector3TypeSerializer = createSimpleSerializationInfo<
  Vector3,
  Vector3TypeDescriptor
>(
  TypeID.Vector3,
  "vector3",
  reader => ({
    x: reader.readSingle(),
    y: reader.readSingle(),
    z: reader.readSingle()
  }),
  (writer, value) => {
    writer.writeSingle(value.x);
    writer.writeSingle(value.y);
    writer.writeSingle(value.z);
  }
);
