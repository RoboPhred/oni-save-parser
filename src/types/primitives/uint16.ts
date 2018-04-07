
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
    id: TypeInfo.UInt16,
    name: "int-16-unsigned",
    parse(reader: DataReader, descriptor: TypeDescriptor): number {
        return reader.readUInt16();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: number): void {
        writer.writeUInt16(value);
    }
};