import { Vector3, Quaternion } from "../../save-structure/data-types";
import { LongNum } from "../types";
/**
 * A little-endian streaming data writer.
 */
export interface DataWriter {
    readonly position: number;
    writeByte(value: number): void;
    writeSByte(value: number): void;
    writeBytes(value: ArrayBuffer | ArrayBufferView): void;
    writeUInt16(value: number): void;
    writeInt16(value: number): void;
    writeUInt32(value: number): void;
    writeInt32(value: number): void;
    replaceInt32(value: number, position: number): void;
    writeUInt64(value: LongNum): void;
    writeInt64(value: LongNum): void;
    writeSingle(value: number): void;
    writeDouble(value: number): void;
    writeChars(value: string): void;
    writeKleiString(value: string | null): void;
    writeVector3(value: Vector3): void;
    writeQuaternion(value: Quaternion): void;
    /**
     * Gets the current content of the DataWriter.
     */
    getBytes(): ArrayBuffer;
    /**
     * Gets a view into the current content of the DataWriter.
     */
    getBytesView(): Uint8Array;
}
