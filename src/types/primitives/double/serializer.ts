
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
    DoubleTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class DoubleTypeSerializer implements TypeSerializationInfo<number, DoubleTypeDescriptor> {
    readonly id = TypeInfo.Double;
    readonly name = "double";

    parse(reader: DataReader, descriptor: DoubleTypeDescriptor): number {
        return reader.readDouble();
    }

    write(writer: DataWriter, descriptor: DoubleTypeDescriptor, value: number): void {
        writer.writeDouble(value);
    }
};
