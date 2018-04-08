import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo, TypeDescriptorSerializer } from "../../services";
import { ArrayTypeDescriptor } from "./descriptor";
export declare class ArrayTypeSerializer implements TypeSerializationInfo<any[] | null, ArrayTypeDescriptor> {
    private _descriptorSerializer;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_descriptorSerializer: TypeDescriptorSerializer, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): ArrayTypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: ArrayTypeDescriptor): void;
    parseType(reader: DataReader, descriptor: ArrayTypeDescriptor): any[] | null;
    writeType(writer: DataWriter, descriptor: ArrayTypeDescriptor, value: any[] | null): void;
}
