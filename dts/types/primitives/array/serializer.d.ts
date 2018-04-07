import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo } from "../../services";
import { ArrayTypeDescriptor } from "./descriptor";
export declare class ArrayTypeSerializer implements TypeSerializationInfo<any[] | null, ArrayTypeDescriptor> {
    private _typeSerializer;
    readonly id: TypeInfo;
    readonly name: string;
    constructor(_typeSerializer: TypeSerializer);
    parse(reader: DataReader, descriptor: ArrayTypeDescriptor): any[] | null;
    write(writer: DataWriter, descriptor: ArrayTypeDescriptor, value: any[] | null): void;
}
