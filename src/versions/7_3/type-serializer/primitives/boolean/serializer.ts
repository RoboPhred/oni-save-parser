
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


export const BooleanTypeSerializer = createSimpleSerializationInfo(
    TypeID.Boolean,
    "boolean",
    reader => reader.readByte() == 1,
    (writer, value) => writer.writeByte(value ? 1 : 0)
);
