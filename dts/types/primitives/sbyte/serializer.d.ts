import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { SByteTypeDescriptor } from "./descriptor";
export declare class SByteTypeSerializer implements TypeSerializationInfo<number, SByteTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: SByteTypeDescriptor): number;
    write(writer: DataWriter, descriptor: SByteTypeDescriptor, value: number): void;
}
