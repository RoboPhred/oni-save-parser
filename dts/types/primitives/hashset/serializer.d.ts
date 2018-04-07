import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo } from "../../services";
import { HashSetTypeDescriptor } from "./descriptor";
export declare class HashSetTypeSerializer implements TypeSerializationInfo<Set<any> | null, HashSetTypeDescriptor> {
    private _typeSerializer;
    readonly id: TypeInfo;
    readonly name: string;
    constructor(_typeSerializer: TypeSerializer);
    parse(reader: DataReader, descriptor: HashSetTypeDescriptor): Set<any> | null;
    write(writer: DataWriter, descriptor: HashSetTypeDescriptor, value: Set<any> | null): void;
}
