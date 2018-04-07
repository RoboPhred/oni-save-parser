
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
    name: "int-16",
    parse(reader: DataReader, descriptor: TypeDescriptor): number {
        return reader.readInt16();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: number): void {
        writer.writeInt16(value);
    }
};