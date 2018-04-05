
import Long from "long";

/**
 * A little-endian streaming data reader.
 */
export interface DataReader {
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
}