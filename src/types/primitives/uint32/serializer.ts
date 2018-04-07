
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
    UInt32TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class UInt32TypeSerializer implements TypeSerializationInfo<number, UInt32TypeDescriptor> {
    readonly id = TypeInfo.UInt32;
    readonly name = "int-32-unsigned";

    parse(reader: DataReader, descriptor: UInt32TypeDescriptor): number {
        return reader.readUInt32();
    }

    write(writer: DataWriter, descriptor: UInt32TypeDescriptor, value: number): void {
        writer.writeUInt32(value);
    }
};