import { Identifier } from "microinject";
import { DataReader, DataWriter } from "../binary-serializer";
import { TypeDescriptor, TypeID } from "./interfaces";
export interface TypeSerializationInfo<TType = any, TDescriptor extends TypeDescriptor<TType> = TypeDescriptor<TType>> {
    id: TypeID;
    name: TDescriptor["name"];
    parseDescriptor(reader: DataReader): TDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: TDescriptor): void;
    parseType(reader: DataReader, descriptor: TDescriptor): TType;
    writeType(writer: DataWriter, descriptor: TDescriptor, value: TType): void;
}
export declare const TypeSerializationInfo: Identifier<TypeSerializationInfo>;
export interface TypeDescriptorSerializer {
    parseDescriptor(reader: DataReader): TypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: TypeDescriptor): void;
}
export declare const TypeDescriptorSerializer: Identifier<TypeDescriptorSerializer>;
export interface TypeSerializer {
    parseType<T = any>(reader: DataReader, descriptor: TypeDescriptor<T>): T;
    writeType<T = any>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void;
}
export declare const TypeSerializer: Identifier<TypeSerializer>;
