import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializer, TypeSerializationInfo } from "../../services";
import { Pair } from "./interfaces";
import { PairTypeDescriptor } from "./descriptor";
export declare class PairTypeSerializer implements TypeSerializationInfo<Pair | null, PairTypeDescriptor> {
    private _typeSerializer;
    readonly id: TypeInfo;
    readonly name: string;
    constructor(_typeSerializer: TypeSerializer);
    parse(reader: DataReader, descriptor: PairTypeDescriptor): Pair | null;
    write(writer: DataWriter, descriptor: PairTypeDescriptor, value: Pair | null): void;
}
