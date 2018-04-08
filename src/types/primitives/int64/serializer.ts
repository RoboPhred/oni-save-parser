
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
    Int64TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class Int64TypeSerializer implements TypeSerializationInfo<Long, Int64TypeDescriptor> {
    readonly id = TypeInfo.Int64;
    readonly name = "int-64";

    parseType(reader: DataReader, descriptor: Int64TypeDescriptor): Long {
        return reader.readInt64();
    }

    writeType(writer: DataWriter, descriptor: Int64TypeDescriptor, value: Long): void {
        writer.writeInt64(value);
    }
};