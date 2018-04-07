import { DataReader, DataWriter } from "../binary-serializer";
import { TypeDescriptor } from "./interfaces";
export declare function parse<T>(reader: DataReader, descriptor: TypeDescriptor<T>): T;
export declare function write<T>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void;
