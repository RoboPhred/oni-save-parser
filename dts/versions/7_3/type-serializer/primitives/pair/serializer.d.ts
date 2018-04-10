import { DataReader, DataWriter } from "../../../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo, TypeDescriptorSerializer } from "../../services";
import { Pair } from "./interfaces";
import { PairTypeDescriptor } from "./descriptor";
export declare class PairTypeSerializer implements TypeSerializationInfo<Pair | null, PairTypeDescriptor> {
    private _descriptorSerializer;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_descriptorSerializer: TypeDescriptorSerializer, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): PairTypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: PairTypeDescriptor): void;
    parseType(reader: DataReader, descriptor: PairTypeDescriptor): Pair | null;
    writeType(writer: DataWriter, descriptor: PairTypeDescriptor, value: Pair | null): void;
}
