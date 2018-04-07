
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
    BooleanTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class BooleanTypeSerializer implements TypeSerializationInfo<boolean, BooleanTypeDescriptor> {
    readonly id = TypeInfo.Boolean;
    readonly name = "boolean";

    parse(reader: DataReader, descriptor: BooleanTypeDescriptor): boolean {
        return reader.readByte() === 1;
    }
    
    write(writer: DataWriter, descriptor: BooleanTypeDescriptor, value: boolean): void {
        writer.writeByte(value ? 1 : 0);
    }
};