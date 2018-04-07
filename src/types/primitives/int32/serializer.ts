
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
    Int32TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class Int32TypeSerializer implements TypeSerializationInfo<number, Int32TypeDescriptor> {
    readonly id = TypeInfo.Int32;
    readonly name = "int-32";

    parse(reader: DataReader, descriptor: Int32TypeDescriptor): number {
        return reader.readInt32();
    }

    write(writer: DataWriter, descriptor: Int32TypeDescriptor, value: number): void {
        writer.writeInt32(value);
    }
};