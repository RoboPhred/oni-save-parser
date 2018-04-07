import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo } from "../../services";
import { Dictionary } from "./interfaces";
import { DictionaryTypeDescriptor } from "./descriptor";
export declare class DictionaryTypeSerializer implements TypeSerializationInfo<Dictionary | null, DictionaryTypeDescriptor> {
    private _typeSerializer;
    readonly id: TypeInfo;
    readonly name: string;
    constructor(_typeSerializer: TypeSerializer);
    parse(reader: DataReader, descriptor: DictionaryTypeDescriptor): Dictionary | null;
    write(writer: DataWriter, descriptor: DictionaryTypeDescriptor, value: Dictionary | null): void;
}
