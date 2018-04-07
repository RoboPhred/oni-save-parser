import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { Int32TypeDescriptor } from "./descriptor";
export declare class Int32TypeSerializer implements TypeSerializationInfo<number, Int32TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: Int32TypeDescriptor): number;
    write(writer: DataWriter, descriptor: Int32TypeDescriptor, value: number): void;
}
