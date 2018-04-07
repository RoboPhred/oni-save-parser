/// <reference types="long" />
import Long from "long";
import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { Int64TypeDescriptor } from "./descriptor";
export declare class Int64TypeSerializer implements TypeSerializationInfo<Long, Int64TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: Int64TypeDescriptor): Long;
    write(writer: DataWriter, descriptor: Int64TypeDescriptor, value: Long): void;
}
