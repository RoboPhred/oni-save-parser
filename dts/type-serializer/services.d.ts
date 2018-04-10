import { Identifier } from "microinject";
import { BinarySerializable, DataReader, DataWriter } from "../binary-serializer";
import { TypeDescriptor, TypeTemplate, TypeID } from "./interfaces";
export interface TypeSerializationInfo<TType = any, TDescriptor extends TypeDescriptor<TType> = TypeDescriptor<TType>> {
    id: TypeID;
    name: TDescriptor["name"];
    parseDescriptor(reader: DataReader): TDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: TDescriptor): void;
    parseType(reader: DataReader, descriptor: TDescriptor): TType;
    writeType(writer: DataWriter, descriptor: TDescriptor, value: TType): void;
}
export declare const TypeSerializationInfo: Identifier<TypeSerializationInfo>;
export interface TypeTemplateRegistry extends BinarySerializable {
    has(templateName: string): boolean;
    get(templateName: string): TypeTemplate | undefined;
}
export declare const TypeTemplateRegistry: Identifier<TypeTemplateRegistry>;
export interface TypeDescriptorSerializer {
    parseDescriptor(reader: DataReader): TypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: TypeDescriptor): void;
}
export declare const TypeDescriptorSerializer: Identifier<TypeDescriptorSerializer>;
export interface TypeSerializer {
    parseType<T = any>(reader: DataReader, descriptor: TypeDescriptor<T>): T;
    writeType<T = any>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void;
    hasTemplatedType(templateName: string): boolean;
    parseTemplatedType<T extends object = any>(reader: DataReader, templateName: string): T;
    writeTemplatedType<T extends object = any>(writer: DataWriter, templateName: string, value: T): void;
}
export declare const TypeSerializer: Identifier<TypeSerializer>;
