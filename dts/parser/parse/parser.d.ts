import { DataReader } from "../../binary-serializer";
export declare type ParseIterator<T> = IterableIterator<any>;
export declare function parse<T>(reader: DataReader, readParser: ParseIterator<T>): T;
