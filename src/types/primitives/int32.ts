
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
    id: TypeInfo.Int32,
    name: "int-32",
    parse(reader: DataReader, descriptor: TypeDescriptor): number {
        return reader.readInt32();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: number): void {
        writer.writeInt32(value);
    }
};