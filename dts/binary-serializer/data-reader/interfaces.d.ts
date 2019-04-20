import { Vector3, Quaternion } from "../../save-structure/data-types";
import { LongNum } from "../types";
/**
 * A little-endian streaming data reader.
 */
export interface DataReader {
    readonly position: number;
    readByte(): number;
    readSByte(): number;
    readBytes(length: number): ArrayBuffer;
    viewBytes(length: number): ArrayBufferView;
    /**
     * Read all remaining bytes in the reader into a new ArrayBuffer.
     * This is not efficient for one-off passes of the data.
     * For that, use ```viewAllBytes```.
     * @see viewAllBytes
     */
    readAllBytes(): ArrayBuffer;
    /**
     * Returns a view of the remaining bytes in this data reader.
     * Useful for one-off passes, not not recommended
     * when the data is going to be kept around.
     */
    viewAllBytes(): Uint8Array;
    readUInt16(): number;
    readInt16(): number;
    readUInt32(): number;
    readInt32(): number;
    readUInt64(): LongNum;
    readInt64(): LongNum;
    readSingle(): number;
    readDouble(): number;
    readChars(length: number): string;
    readKleiString(): string | null;
    skipBytes(length: number): void;
    readVector3(): Vector3;
    readQuaternion(): Quaternion;
}
