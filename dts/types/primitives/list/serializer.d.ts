import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo } from "../../services";
import { ListTypeDescriptor } from "./descriptor";
export declare class ListTypeSerializer implements TypeSerializationInfo<any[] | null, ListTypeDescriptor> {
    private _typeSerializer;
    readonly id: TypeInfo;
    readonly name: string;
    constructor(_typeSerializer: TypeSerializer);
    parse(reader: DataReader, descriptor: ListTypeDescriptor): any[] | null;
    write(writer: DataWriter, descriptor: ListTypeDescriptor, value: any[] | null): void;
}
