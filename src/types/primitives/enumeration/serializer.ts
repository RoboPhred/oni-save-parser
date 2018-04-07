
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
    EnumerationTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class EnumerationTypeSerializer implements TypeSerializationInfo<number, EnumerationTypeDescriptor> {
    readonly id = TypeInfo.Enumeration;
    readonly name = "enumeration";

    parse(reader: DataReader, descriptor: EnumerationTypeDescriptor): number {
        return reader.readInt32();
    }

    write(writer: DataWriter, descriptor: EnumerationTypeDescriptor, value: number): void {
        writer.writeInt32(value);
    }
};
