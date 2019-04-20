import { LongNum } from "../../binary-serializer";

import { UnparseIterator } from "./unparser";

export interface BasicWriteInstruction {
  type: "write";
  dataType: string;
}

export interface WriteByteInstruction extends BasicWriteInstruction {
  dataType: "byte";
  value: number;
}
export function writeByte(value: number): WriteByteInstruction {
  return {
    type: "write",
    dataType: "byte",
    value
  };
}

export interface WriteSByteInstruction extends BasicWriteInstruction {
  dataType: "signed-byte";
  value: number;
}
export function writeSByte(value: number): WriteSByteInstruction {
  return {
    type: "write",
    dataType: "signed-byte",
    value
  };
}

export interface WriteBytesInstruction extends BasicWriteInstruction {
  dataType: "byte-array";
  value: ArrayBuffer | ArrayBufferView;
}
export function writeBytes(
  bytes: ArrayBuffer | ArrayBufferView
): WriteBytesInstruction {
  return {
    type: "write",
    dataType: "byte-array",
    value: bytes
  };
}

export interface WriteUInt16Instruction extends BasicWriteInstruction {
  dataType: "uint-16";
  value: number;
}
export function writeUInt16(value: number): WriteUInt16Instruction {
  return {
    type: "write",
    dataType: "uint-16",
    value
  };
}

export interface WriteInt16Instruction extends BasicWriteInstruction {
  dataType: "int-16";
  value: number;
}
export function writeInt16(value: number): WriteInt16Instruction {
  return {
    type: "write",
    dataType: "int-16",
    value
  };
}

export interface WriteUInt32Instruction extends BasicWriteInstruction {
  dataType: "uint-32";
  value: number;
}
export function writeUInt32(value: number): WriteUInt32Instruction {
  return {
    type: "write",
    dataType: "uint-32",
    value
  };
}

export interface WriteInt32Instruction extends BasicWriteInstruction {
  dataType: "int-32";
  value: number;
}
export function writeInt32(value: number): WriteInt32Instruction {
  return {
    type: "write",
    dataType: "int-32",
    value
  };
}

export interface WriteUInt64Instruction extends BasicWriteInstruction {
  dataType: "uint-64";
  value: LongNum;
}
export function writeUInt64(value: LongNum): WriteUInt64Instruction {
  return {
    type: "write",
    dataType: "uint-64",
    value
  };
}

export interface WriteInt64Instruction extends BasicWriteInstruction {
  dataType: "int-64";
  value: LongNum;
}
export function writeInt64(value: LongNum): WriteInt64Instruction {
  return {
    type: "write",
    dataType: "int-64",
    value
  };
}

export interface WriteSingleInstruction extends BasicWriteInstruction {
  dataType: "single";
  value: number;
}
export function writeSingle(value: number): WriteSingleInstruction {
  return {
    type: "write",
    dataType: "single",
    value
  };
}

export interface WriteDoubleInstruction extends BasicWriteInstruction {
  dataType: "double";
  value: number;
}
export function writeDouble(value: number): WriteDoubleInstruction {
  return {
    type: "write",
    dataType: "double",
    value
  };
}

export interface WriteCharsInstruction extends BasicWriteInstruction {
  dataType: "chars";
  value: string;
}
export function writeChars(value: string): WriteCharsInstruction {
  return {
    type: "write",
    dataType: "chars",
    value
  };
}

export interface WriteKleiStringInstruction extends BasicWriteInstruction {
  dataType: "klei-string";
  value: string;
}
export function writeKleiString(value: string): WriteKleiStringInstruction {
  return {
    type: "write",
    dataType: "klei-string",
    value
  };
}

export interface GetWriterPositionInstruction extends BasicWriteInstruction {
  dataType: "writer-position";
}
export function getWriterPosition(): GetWriterPositionInstruction {
  return {
    type: "write",
    dataType: "writer-position"
  };
}

export interface DataLengthToken {
  writePosition: number;
  startPosition: number;
}

export interface WriteDataLengthBeginInstruction extends BasicWriteInstruction {
  dataType: "data-length:begin";
  startPosition?: number;
}
export function writeDataLengthBegin(
  startPosition?: number
): WriteDataLengthBeginInstruction {
  return {
    type: "write",
    dataType: "data-length:begin",
    startPosition
  };
}

export interface WriteDataLengthEndInstruction extends BasicWriteInstruction {
  dataType: "data-length:end";
  token: DataLengthToken;
}
export function writeDataLengthEnd(
  token: DataLengthToken
): WriteDataLengthEndInstruction {
  return {
    type: "write",
    dataType: "data-length:end",
    token
  };
}

export interface WriteCompressedInstruction extends BasicWriteInstruction {
  dataType: "compressed";
  unparser: UnparseIterator;
}
export function writeCompressed(
  unparser: UnparseIterator
): WriteCompressedInstruction {
  return {
    type: "write",
    dataType: "compressed",
    unparser
  };
}

export type WriteInstruction =
  | WriteByteInstruction
  | WriteSByteInstruction
  | WriteBytesInstruction
  | WriteUInt16Instruction
  | WriteInt16Instruction
  | WriteUInt32Instruction
  | WriteInt32Instruction
  | WriteUInt64Instruction
  | WriteInt64Instruction
  | WriteSingleInstruction
  | WriteDoubleInstruction
  | WriteCharsInstruction
  | WriteKleiStringInstruction
  | GetWriterPositionInstruction
  | WriteDataLengthBeginInstruction
  | WriteDataLengthEndInstruction
  | WriteCompressedInstruction;

export type WriteDataTypes = WriteInstruction["dataType"];

export function isWriteInstruction(value: any): value is WriteInstruction {
  // TODO: Use a symbol or something to ensure this is a real parse instruction.
  return value && value.type === "write";
}
