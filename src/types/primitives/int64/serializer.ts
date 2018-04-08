
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
    Int64TypeDescriptor
} from "./descriptor";


export const Int64TypeSerializer = createSimpleSerializationInfo<Long, Int64TypeDescriptor>(
    TypeID.Int64,
    "int-64",
    reader => reader.readInt64(),
    (writer, value) => writer.writeInt64(value)
);
