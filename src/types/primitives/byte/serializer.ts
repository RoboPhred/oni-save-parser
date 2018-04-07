
import {
    injectable,
    singleton
} from "microinject";

import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";

import {
    TypeInfo
} from "../../interfaces";

import {
    TypeSerializationInfo
} from "../../services";


import {
    ByteTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class ByteTypeSerializer implements TypeSerializationInfo<number, ByteTypeDescriptor> {
    readonly id = TypeInfo.Byte;
    readonly name = "byte";

    parse(reader: DataReader, descriptor: ByteTypeDescriptor): number {
        return reader.readByte();
    }

    write(writer: DataWriter, descriptor: ByteTypeDescriptor, value: number): void {
        writer.writeByte(value);
    }
};