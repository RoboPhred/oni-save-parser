
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
    UInt16TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class UInt16TypeSerializer implements TypeSerializationInfo<number, UInt16TypeDescriptor> {
    readonly id = TypeInfo.UInt16;
    readonly name = "int-16-unsigned";

    parse(reader: DataReader, descriptor: UInt16TypeDescriptor): number {
        return reader.readUInt16();
    }

    write(writer: DataWriter, descriptor: UInt16TypeDescriptor, value: number): void {
        writer.writeUInt16(value);
    }
};