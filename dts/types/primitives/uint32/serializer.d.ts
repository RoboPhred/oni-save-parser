import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { UInt32TypeDescriptor } from "./descriptor";
export declare class UInt32TypeSerializer implements TypeSerializationInfo<number, UInt32TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: UInt32TypeDescriptor): number;
    write(writer: DataWriter, descriptor: UInt32TypeDescriptor, value: number): void;
}
