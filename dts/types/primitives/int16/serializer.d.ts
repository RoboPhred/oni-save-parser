import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { Int16TypeDescriptor } from "./descriptor";
export declare class Int16TypeSerializer implements TypeSerializationInfo<number, Int16TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: Int16TypeDescriptor): number;
    write(writer: DataWriter, descriptor: Int16TypeDescriptor, value: number): void;
}
