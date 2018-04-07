import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { UInt16TypeDescriptor } from "./descriptor";
export declare class UInt16TypeSerializer implements TypeSerializationInfo<number, UInt16TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: UInt16TypeDescriptor): number;
    write(writer: DataWriter, descriptor: UInt16TypeDescriptor, value: number): void;
}
