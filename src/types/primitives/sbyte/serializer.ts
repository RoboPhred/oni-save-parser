
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
    SByteTypeDescriptor
} from "./descriptor";

export const SByteTypeSerializer = createSimpleSerializationInfo<number, SByteTypeDescriptor>(
    TypeID.SByte,
    "byte-signed",
    reader => reader.readSByte(),
    (writer, value) => writer.writeSByte(value)
);
