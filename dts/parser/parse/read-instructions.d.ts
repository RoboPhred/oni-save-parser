import { ParseIterator } from "./parser";
export interface BasicReadInstruction {
    type: "read";
    dataType: string;
}
export interface ReadByteInstruction extends BasicReadInstruction {
    dataType: "byte";
}
export declare function readByte(): ReadByteInstruction;
export interface ReadSByteInstruction extends BasicReadInstruction {
    dataType: "signed-byte";
}
export declare function readSByte(): ReadSByteInstruction;
export interface ReadBytesInstruction extends BasicReadInstruction {
    dataType: "byte-array";
    length?: number;
}
export declare function readBytes(length?: number): ReadBytesInstruction;
export interface ReadUInt16Instruction extends BasicReadInstruction {
    dataType: "uint-16";
}
export declare function readUInt16(): ReadUInt16Instruction;
export interface ReadInt16Instruction extends BasicReadInstruction {
    dataType: "int-16";
}
export declare function readInt16(): ReadInt16Instruction;
export interface ReadUInt32Instruction extends BasicReadInstruction {
    dataType: "uint-32";
}
export declare function readUInt32(): ReadUInt32Instruction;
export interface ReadInt32Instruction extends BasicReadInstruction {
    dataType: "int-32";
}
export declare function readInt32(): ReadInt32Instruction;
export interface ReadUInt64Instruction extends BasicReadInstruction {
    dataType: "uint-64";
}
export declare function readUInt64(): ReadUInt64Instruction;
export interface ReadInt64Instruction extends BasicReadInstruction {
    dataType: "int-64";
}
export declare function readInt64(): ReadInt64Instruction;
export interface ReadSingleInstruction extends BasicReadInstruction {
    dataType: "single";
}
export declare function readSingle(): ReadSingleInstruction;
export interface ReadDoubleInstruction extends BasicReadInstruction {
    dataType: "double";
}
export declare function readDouble(): ReadDoubleInstruction;
export interface ReadCharsInstruction extends BasicReadInstruction {
    dataType: "chars";
    length: number;
}
export declare function readChars(length: number): ReadCharsInstruction;
export interface ReadKleiStringInstruction extends BasicReadInstruction {
    dataType: "klei-string";
}
export declare function readKleiString(): ReadKleiStringInstruction;
export interface SkipBytesInstruction extends BasicReadInstruction {
    dataType: "skip-bytes";
    length: number;
}
export declare function skipBytes(length: number): SkipBytesInstruction;
export interface ReadCompressedInstruction extends BasicReadInstruction {
    dataType: "compressed";
    parser: ParseIterator<any>;
}
export declare function readCompressed(parser: ParseIterator<any>): ReadCompressedInstruction;
export interface GetReaderPosition extends BasicReadInstruction {
    dataType: "reader-position";
}
export declare function getReaderPosition(): GetReaderPosition;
export declare type ReadInstruction = ReadByteInstruction | ReadSByteInstruction | ReadBytesInstruction | ReadUInt16Instruction | ReadInt16Instruction | ReadUInt32Instruction | ReadInt32Instruction | ReadUInt64Instruction | ReadInt64Instruction | ReadSingleInstruction | ReadDoubleInstruction | ReadCharsInstruction | ReadKleiStringInstruction | SkipBytesInstruction | ReadCompressedInstruction | GetReaderPosition;
export declare type ReadDataTypes = ReadInstruction["dataType"];
export declare function isReadInstruction(value: any): value is ReadInstruction;
