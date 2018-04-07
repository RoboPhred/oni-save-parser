
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
    SByteTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class SByteTypeSerializer implements TypeSerializationInfo<number, SByteTypeDescriptor> {
    readonly id = TypeInfo.SByte;
    readonly name = "byte-signed";

    parse(reader: DataReader, descriptor: SByteTypeDescriptor): number {
        return reader.readSByte();
    }

    write(writer: DataWriter, descriptor: SByteTypeDescriptor, value: number): void {
        writer.writeSByte(value);
    }
};