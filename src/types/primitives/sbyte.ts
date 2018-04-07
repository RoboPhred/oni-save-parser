
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
    id: TypeInfo.SByte,
    name: "signed-byte",
    parse(reader: DataReader, descriptor: TypeDescriptor): number {
        return reader.readSByte();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: number): void {
        writer.writeSByte(value);
    }
};