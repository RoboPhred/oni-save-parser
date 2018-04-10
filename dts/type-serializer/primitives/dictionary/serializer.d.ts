import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeDescriptorSerializer, TypeSerializer, TypeSerializationInfo } from "../../services";
import { Dictionary } from "./interfaces";
import { DictionaryTypeDescriptor } from "./descriptor";
export declare class DictionaryTypeSerializer implements TypeSerializationInfo<Dictionary | null, DictionaryTypeDescriptor> {
    private _descriptorSerializer;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_descriptorSerializer: TypeDescriptorSerializer, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): DictionaryTypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: DictionaryTypeDescriptor): void;
    parseType(reader: DataReader, descriptor: DictionaryTypeDescriptor): Dictionary | null;
    writeType(writer: DataWriter, descriptor: DictionaryTypeDescriptor, value: Dictionary | null): void;
}
