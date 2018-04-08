
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


export const DoubleTypeSerializer = createSimpleSerializationInfo(
    TypeInfo.Double,
    "double",
    reader => reader.readDouble(),
    (writer, value) => writer.writeDouble(value)
);
