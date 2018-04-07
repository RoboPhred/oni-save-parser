
import {
    DataReader,
    DataWriter
} from "../../binary-serializer";

import {
    TypeDescriptor,
    TypeInfo,
    TypeSerializationInfo
} from "../interfaces";


export const serializationInfo: TypeSerializationInfo<boolean> = {
    id: TypeInfo.Boolean,
    name: "boolean",
    parse(reader: DataReader, descriptor: TypeDescriptor): boolean {
        return reader.readByte() === 1;
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: boolean): void {
        writer.writeByte(value ? 1 : 0);
    }
};