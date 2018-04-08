
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


export const BooleanTypeSerializer = createSimpleSerializationInfo(
    TypeInfo.Boolean,
    "boolean",
    reader => reader.readByte() == 1,
    (writer, value) => writer.writeByte(value ? 1 : 0)
);
