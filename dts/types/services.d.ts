import { Identifier } from "microinject";
import { DataReader, DataWriter } from "../binary-serializer";
import { TypeDescriptor, TypeInfo } from "./interfaces";
export interface TypeSerializationInfo<TType = any, TDescriptor extends TypeDescriptor<TType> = TypeDescriptor<TType>> {
    id: TypeInfo;
    name: TDescriptor["name"];
    parse(reader: DataReader, descriptor: TDescriptor): TType;
    write(writer: DataWriter, descriptor: TDescriptor, value: TType): void;
}
export declare const TypeSerializationInfo: Identifier<TypeSerializationInfo>;
export interface TypeSerializer {
    parse<T = any>(reader: DataReader, descriptor: TypeDescriptor<T>): T;
    write<T = any>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void;
}
export declare const TypeSerializer: Identifier<TypeSerializer>;
