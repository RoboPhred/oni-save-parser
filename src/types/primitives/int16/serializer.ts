
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
    Int16TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class Int16TypeSerializer implements TypeSerializationInfo<number, Int16TypeDescriptor> {
    readonly id = TypeInfo.Int16;
    readonly name = "int-16";

    parseType(reader: DataReader, descriptor: Int16TypeDescriptor): number {
        return reader.readInt16();
    }

    writeType(writer: DataWriter, descriptor: Int16TypeDescriptor, value: number): void {
        writer.writeInt16(value);
    }
};