
import {
    injectable,
    singleton
} from "microinject";

import Long from "long";

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
    UInt64TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class Int64TypeSerializer implements TypeSerializationInfo<Long, UInt64TypeDescriptor> {
    readonly id = TypeInfo.UInt64;
    readonly name = "int-64-unsigned";

    parseType(reader: DataReader, descriptor: UInt64TypeDescriptor): Long {
        return reader.readUInt64();
    }

    writeType(writer: DataWriter, descriptor: UInt64TypeDescriptor, value: Long): void {
        writer.writeUInt64(value);
    }
};