/// <reference types="long" />
import Long from "long";
import { DataReader } from "./interfaces";
export declare class ArrayDataReader implements DataReader {
    private _buffer;
    private _view;
    private _byteOffset;
    private _stringDecoder;
    constructor(buffer: ArrayBuffer);
    readByte(): number;
    readSByte(): number;
    readBytes(length: number): ArrayBufferView;
    readAllBytes(): ArrayBufferView;
    readUInt16(): number;
    readInt16(): number;
    readUInt32(): number;
    readInt32(): number;
    readUInt64(): Long;
    readInt64(): Long;
    readSingle(): number;
    readDouble(): number;
    readKleiString(): string;
    private _checkCanRead(length);
}
