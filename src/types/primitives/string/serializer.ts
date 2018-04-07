
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
    StringTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class StringTypeSerializer implements TypeSerializationInfo<string | null, StringTypeDescriptor> {
    readonly id = TypeInfo.Double;
    readonly name = "string";

    parse(reader: DataReader, descriptor: StringTypeDescriptor): string | null {
        return reader.readKleiString();
    }

    write(writer: DataWriter, descriptor: StringTypeDescriptor, value: string | null): void {
        writer.writeKleiString(value);
    }
};
