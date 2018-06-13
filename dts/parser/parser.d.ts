import { DataReader } from "../binary-serializer";
import { ReadInstruction } from "./read-instructions";
export declare type ParseIterator<T> = IterableIterator<ReadInstruction | T>;
export declare function parse<T>(reader: DataReader, parser: ParseIterator<T>): T;
