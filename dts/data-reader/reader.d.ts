import { DataReader } from "./interfaces";
export declare class DataReaderImpl implements DataReader {
    private _buffer;
    private _view;
    private _byteOffset;
    private _stringDecoder;
    constructor(buffer: ArrayBuffer);
    readByte(): number;
    readBytes(length: number): ArrayBufferView;
    readUInt32(): number;
    readInt32(): number;
    readKleiString(): string;
    private _checkCanRead(length);
}
