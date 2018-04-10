
import {
    TypeDescriptor,
    TypeID
} from "../../interfaces";

import {
    TypeSerializationInfo
} from "../../services";


import {
    createSimpleSerializationInfo
} from "../simple-serializer";

import {
    ByteTypeDescriptor
} from "./descriptor";


export const ByteTypeSerializer = createSimpleSerializationInfo<number, ByteTypeDescriptor>(
    TypeID.Byte,
    "byte",
    reader => reader.readByte(),
    (writer, value) => writer.writeByte(value)
);
