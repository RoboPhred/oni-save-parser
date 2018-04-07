
import {
    DataReader,
    DataWriter
} from "../../binary-serializer";

import {
    TypeDescriptor,
    TypeInfo,
    TypeSerializationInfo
} from "../interfaces";


export const serializationInfo: TypeSerializationInfo<number> = {
    id: TypeInfo.UInt32,
    name: "int-32-unsigned",
    parse(reader: DataReader, descriptor: TypeDescriptor): number {
        return reader.readUInt32();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: number): void {
        writer.writeUInt32(value);
    }
};