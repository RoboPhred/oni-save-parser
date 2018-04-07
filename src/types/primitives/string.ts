
import {
    DataReader,
    DataWriter
} from "../../binary-serializer";

import {
    TypeDescriptor,
    TypeInfo,
    TypeSerializationInfo
} from "../interfaces";


export const serializationInfo: TypeSerializationInfo<string | null> = {
    id: TypeInfo.String,
    name: "string",
    parse(reader: DataReader, descriptor: TypeDescriptor): string | null{
        return reader.readKleiString();
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: string): void {
        writer.writeKleiString(value);
    }
};