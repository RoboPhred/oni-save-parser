
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
    TypeInfo, TypeDescriptor
} from "../interfaces";


export type TypeSerializationInfoClass = {
    new(...args: any[]): TypeSerializationInfo
}

interface NamedTypeDescriptor<TName extends string, TValue> extends TypeDescriptor<TValue> {
    name: TName
}

export function createSimpleSerializationInfo<T, TName extends string>(
    id: TypeInfo,
    name: TName,
    parse: ((reader: DataReader) => T),
    write: ((writer: DataWriter, value: T) => void),
): TypeSerializationInfoClass {
    const simpleClassCtor = class implements TypeSerializationInfo<T, NamedTypeDescriptor<TName, T>> {
        readonly id: TypeInfo = id;
        readonly name: TName = name;
        
        parseDescriptor(reader: DataReader): NamedTypeDescriptor<TName, T> {
            return {
                name
            };
        }

        writeDescriptor(writer: DataWriter, descriptor: NamedTypeDescriptor<TName, T>): void {
            // No additional data.
        }

        parseType(reader: DataReader, descriptor: NamedTypeDescriptor<TName, T>): T {
            return parse(reader);
        }

        writeType(writer: DataWriter, descriptor: NamedTypeDescriptor<TName, T>, value: T): void {
            write(writer, value);
        }
    }
    injectable(TypeSerializationInfo)(simpleClassCtor);
    singleton()(simpleClassCtor);

    return simpleClassCtor;
}