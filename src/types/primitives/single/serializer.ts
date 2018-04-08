
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
    SingleTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class SingleTypeSerializer implements TypeSerializationInfo<number, SingleTypeDescriptor> {
    readonly id = TypeInfo.Single;
    readonly name = "single";

    parseType(reader: DataReader, descriptor: SingleTypeDescriptor): number {
        return reader.readSingle();
    }

    writeType(writer: DataWriter, descriptor: SingleTypeDescriptor, value: number): void {
        writer.writeSingle(value);
    }
};