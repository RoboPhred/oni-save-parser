/// <reference types="long" />
import Long from "long";
import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { UInt64TypeDescriptor } from "./descriptor";
export declare class Int64TypeSerializer implements TypeSerializationInfo<Long, UInt64TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: UInt64TypeDescriptor): Long;
    write(writer: DataWriter, descriptor: UInt64TypeDescriptor, value: Long): void;
}
