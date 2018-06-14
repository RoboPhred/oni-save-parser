/// <reference types="long" />
export interface BasicWriteInstruction {
    type: "write";
    dataType: string;
}
export interface WriteByteInstruction extends BasicWriteInstruction {
    dataType: "byte";
    value: number;
}
export declare function writeByte(value: number): WriteByteInstruction;
export interface WriteSByteInstruction extends BasicWriteInstruction {
    dataType: "signed-byte";
    value: number;
}
export declare function writeSByte(value: number): WriteSByteInstruction;
export interface WriteBytesInstruction extends BasicWriteInstruction {
    dataType: "byte-array";
    value: ArrayBuffer | ArrayBufferView;
}
export declare function writeBytes(bytes: ArrayBuffer | ArrayBufferView): WriteBytesInstruction;
export interface WriteUInt16Instruction extends BasicWriteInstruction {
    dataType: "uint-16";
    value: number;
}
export declare function writeUInt16(value: number): WriteUInt16Instruction;
export interface WriteInt16Instruction extends BasicWriteInstruction {
    dataType: "int-16";
    value: number;
}
export declare function writeInt16(value: number): WriteInt16Instruction;
export interface WriteUInt32Instruction extends BasicWriteInstruction {
    dataType: "uint-32";
    value: number;
}
export declare function writeUInt32(value: number): WriteUInt32Instruction;
export interface WriteInt32Instruction extends BasicWriteInstruction {
    dataType: "int-32";
    value: number;
}
export declare function writeInt32(value: number): WriteInt32Instruction;
export interface WriteUInt64Instruction extends BasicWriteInstruction {
    dataType: "uint-64";
    value: Long;
}
export declare function writeUInt64(value: Long): WriteUInt64Instruction;
export interface WriteInt64Instruction extends BasicWriteInstruction {
    dataType: "int-64";
    value: Long;
}
export declare function writeInt64(value: Long): WriteInt64Instruction;
export interface WriteSingleInstruction extends BasicWriteInstruction {
    dataType: "single";
    value: number;
}
export declare function writeSingle(value: number): WriteSingleInstruction;
export interface WriteDoubleInstruction extends BasicWriteInstruction {
    dataType: "double";
    value: number;
}
export declare function writeDouble(value: number): WriteDoubleInstruction;
export interface WriteCharsInstruction extends BasicWriteInstruction {
    dataType: "chars";
    value: string;
}
export declare function writeChars(value: string): WriteCharsInstruction;
export interface WriteKleiStringInstruction extends BasicWriteInstruction {
    dataType: "klei-string";
    value: string;
}
export declare function writeKleiString(value: string): WriteKleiStringInstruction;
export interface GetWriterPosition extends BasicWriteInstruction {
    dataType: "writer-position";
}
export declare function getWriterPosition(): GetWriterPosition;
export declare type WriteInstruction = WriteByteInstruction | WriteSByteInstruction | WriteBytesInstruction | WriteUInt16Instruction | WriteInt16Instruction | WriteUInt32Instruction | WriteInt32Instruction | WriteUInt64Instruction | WriteInt64Instruction | WriteSingleInstruction | WriteDoubleInstruction | WriteCharsInstruction | WriteKleiStringInstruction | GetWriterPosition;
export declare type WriteDataTypes = WriteInstruction["dataType"];
export declare function isWriteInstruction(value: any): value is WriteInstruction;
