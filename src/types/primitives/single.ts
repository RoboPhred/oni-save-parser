
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
    id: TypeInfo.Int16,
    name: "single",
    parse(reader: DataReader, descriptor: TypeDescriptor): number {
        return reader.readSingle();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: number): void {
        writer.writeSingle(value);
    }
};