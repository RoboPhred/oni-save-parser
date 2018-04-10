import { DataReader, DataWriter } from "../../../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeDescriptorSerializer, TypeSerializer, TypeSerializationInfo } from "../../services";
import { HashSetTypeDescriptor } from "./descriptor";
export declare class HashSetTypeSerializer implements TypeSerializationInfo<Set<any> | null, HashSetTypeDescriptor> {
    private _descriptorSerializer;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_descriptorSerializer: TypeDescriptorSerializer, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): HashSetTypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: HashSetTypeDescriptor): void;
    parseType(reader: DataReader, descriptor: HashSetTypeDescriptor): Set<any> | null;
    writeType(writer: DataWriter, descriptor: HashSetTypeDescriptor, value: Set<any> | null): void;
}
