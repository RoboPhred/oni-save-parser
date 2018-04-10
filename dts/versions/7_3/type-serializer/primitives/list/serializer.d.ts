import { DataReader, DataWriter } from "../../../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo, TypeDescriptorSerializer } from "../../services";
import { ListTypeDescriptor } from "./descriptor";
export declare class ListTypeSerializer implements TypeSerializationInfo<any[] | null, ListTypeDescriptor> {
    private _descriptorSerializer;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_descriptorSerializer: TypeDescriptorSerializer, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): ListTypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: ListTypeDescriptor): void;
    parseType(reader: DataReader, descriptor: ListTypeDescriptor): any[] | null;
    writeType(writer: DataWriter, descriptor: ListTypeDescriptor, value: any[] | null): void;
}
