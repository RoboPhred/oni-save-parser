
import {
    injectable,
    singleton
} from "microinject";


import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";


import {
    TypeDescriptor,
    TypeInfo
} from "../../interfaces";

import {
    TypeSerializationInfo
} from "../../services";


import {
    createSimpleSerializationInfo
} from "../simple-serializer";


export const ByteTypeSerializer = createSimpleSerializationInfo(
    TypeInfo.Byte,
    "byte",
    reader => reader.readByte(),
    (writer, value) => writer.writeByte(value)
);
