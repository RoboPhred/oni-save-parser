import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { DoubleTypeDescriptor } from "./descriptor";
export declare class DoubleTypeSerializer implements TypeSerializationInfo<number, DoubleTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: DoubleTypeDescriptor): number;
    write(writer: DataWriter, descriptor: DoubleTypeDescriptor, value: number): void;
}
