
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

    parseDescriptor(reader: DataReader): EnumerationTypeDescriptor {
        const enumerationName = reader.readKleiString();
        if (enumerationName == null) {
            throw new Error("Enumeration name must not be null.");
        }

        return {
            name: this.name,
            enumerationName
        };
    }

    writeDescriptor(writer: DataWriter, descriptor: EnumerationTypeDescriptor) {
        writer.writeKleiString(descriptor.enumerationName);
    }

    parseType(reader: DataReader, descriptor: EnumerationTypeDescriptor): number {
        return reader.readInt32();
    }

    writeType(writer: DataWriter, descriptor: EnumerationTypeDescriptor, value: number): void {
        writer.writeInt32(value);
    }
};
