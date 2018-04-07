
import Long = require("long");

import {
    DataReader,
    DataWriter
} from "../../binary-serializer";

import {
    TypeDescriptor,
    TypeInfo,
    TypeSerializationInfo
} from "../interfaces";


export const serializationInfo: TypeSerializationInfo<Long> = {
    id: TypeInfo.Int64,
    name: "int-64",
    parse(reader: DataReader, descriptor: TypeDescriptor): Long {
        return reader.readInt64();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: Long): void {
        writer.writeInt64(value);
    }
};