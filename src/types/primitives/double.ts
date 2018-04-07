
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
    id: TypeInfo.Double,
    name: "double",
    parse(reader: DataReader, descriptor: TypeDescriptor): number {
        return reader.readDouble();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: number): void {
        writer.writeDouble(value);
    }
};