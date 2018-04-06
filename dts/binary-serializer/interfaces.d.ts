import { DataReader } from "./data-reader";
import { DataWriter } from "./data-writer";
export interface BinaryParsable {
    parse(reader: DataReader): void;
}
export interface BinaryWritable {
    write(writer: DataWriter): void;
}
export declare type BinarySerializable = BinaryParsable & BinaryWritable;
