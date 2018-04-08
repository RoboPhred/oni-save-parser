
import {
    Newable,
    injectable,
    singleton
} from "microinject";

import {
    DataReader,
    DataWriter
} from "../../binary-serializer";


import {
    TypeSerializationInfo
} from "../services";

import {
    TypeID, TypeDescriptor
} from "../interfaces";


export type TypeSerializationInfoClass = {
    new(...args: any[]): TypeSerializationInfo
}

export function createSimpleSerializationInfo<T, TDescriptor extends TypeDescriptor<T>>(
    id: TypeID,
    name: TDescriptor["name"],
    parse: ((reader: DataReader) => T),
    write: ((writer: DataWriter, value: T) => void),
): TypeSerializationInfoClass {
    const simpleClassCtor = class implements TypeSerializationInfo<T, TDescriptor> {
        readonly id = id;
        readonly name: TDescriptor["name"] = name;
        
        parseDescriptor(reader: DataReader): TDescriptor {
            return {
                name
            } as TDescriptor;
        }

        writeDescriptor(writer: DataWriter, descriptor: TDescriptor): void {
            // No additional data.
        }

        parseType(reader: DataReader, descriptor: TDescriptor): T {
            return parse(reader);
        }

        writeType(writer: DataWriter, descriptor: TDescriptor, value: T): void {
            write(writer, value);
        }
    }
    injectable(TypeSerializationInfo)(simpleClassCtor);
    singleton()(simpleClassCtor);

    return simpleClassCtor;
}