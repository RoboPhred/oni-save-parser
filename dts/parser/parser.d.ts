import { DataReader, DataWriter } from "../binary-serializer";
export declare type ParseIterator<T> = IterableIterator<any>;
export declare type WriteIterator<T> = IterableIterator<any>;
export declare function parse<T>(reader: DataReader, readParser: ParseIterator<T>): T;
export declare function write<T>(writer: DataWriter, writeParser: WriteIterator<T>): T;
