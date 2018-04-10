import { DataReader, DataWriter } from "../../../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo, TypeDescriptorSerializer } from "../../services";
import { ArrayTypeDescriptor } from "./descriptor";
export declare class ArrayTypeSerializer implements TypeSerializationInfo<any[] | Uint8Array | null, ArrayTypeDescriptor> {
    private _descriptorSerializer;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_descriptorSerializer: TypeDescriptorSerializer, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): ArrayTypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: ArrayTypeDescriptor): void;
    parseType(reader: DataReader, descriptor: ArrayTypeDescriptor): any[] | Uint8Array | null;
    writeType(writer: DataWriter, descriptor: ArrayTypeDescriptor, value: any[] | Uint8Array | null): void;
}
