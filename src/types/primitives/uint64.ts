
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
    id: TypeInfo.UInt64,
    name: "int-64-unsigned",
    parse(reader: DataReader, descriptor: TypeDescriptor): Long {
        return reader.readUInt64();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: Long): void {
        writer.writeUInt64(value);
    }
};