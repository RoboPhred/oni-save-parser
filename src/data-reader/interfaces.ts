
import Long from "long";

import {
    Vector3,
    Quaternion
} from "../interfaces";

/**
 * A little-endian streaming data reader.
 */
export interface DataReader {
    readonly position: number;

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

    readChars(length: number): string;
    readKleiString(): string | null;

    skipBytes(length: number): void;

    readVector3(): Vector3;
    readQuaternion(): Quaternion;
}