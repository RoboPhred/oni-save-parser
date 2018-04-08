
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
    DoubleTypeDescriptor
} from "./descriptor";


export const DoubleTypeSerializer = createSimpleSerializationInfo<number, DoubleTypeDescriptor>(
    TypeID.Double,
    "double",
    reader => reader.readDouble(),
    (writer, value) => writer.writeDouble(value)
);
