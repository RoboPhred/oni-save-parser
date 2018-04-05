
import {
    TextDecoder
} from "text-encoding";

import Long from "long";

import {
    DataReader
} from "./interfaces";

export class ArrayDataReader implements DataReader {

    private _buffer: ArrayBuffer;
    private _view: DataView;
    private _byteOffset: number = 0;
    private _stringDecoder = new TextDecoder("utf-8");

    constructor(buffer: ArrayBuffer) {
        this._buffer = buffer;
        this._view = new DataView(buffer);
    }

    readByte(): number {
        this._checkCanRead(1);
        const val = this._view.getUint8(this._byteOffset);
        this._byteOffset += 1;
        return val;
    }

    readSByte(): number {
        this._checkCanRead(1);
        const val = this._view.getInt8(this._byteOffset);
        this._byteOffset += 1;
        return val;
    }

    readBytes(length: number): ArrayBufferView {
        this._checkCanRead(length);
        const data = new DataView(this._buffer, this._byteOffset, length);
        this._byteOffset += length;
        return data;
    }

    readAllBytes(): ArrayBufferView {
        const data = new DataView(this._buffer, this._byteOffset, this._buffer.byteLength - this._byteOffset);
        this._byteOffset = this._buffer.byteLength;
        return data;
    }

    readUInt16(): number {
        this._checkCanRead(2);
        const val = this._view.getUint16(this._byteOffset, true);
        this._byteOffset += 2;
        return val;
    }

    readInt16(): number {
        this._checkCanRead(2);
        const val = this._view.getInt16(this._byteOffset, true);
        this._byteOffset += 2;
        return val;
    }

    readUInt32(): number {
        this._checkCanRead(4);
        const val = this._view.getUint32(this._byteOffset, true);
        this._byteOffset += 4;
        return val;
    }
    readInt32(): number {
        this._checkCanRead(4);
        const val = this._view.getInt32(this._byteOffset, true);
        this._byteOffset += 4;
        return val;
    }

    readUInt64(): Long {
        // little-endian, lower comes first.
        const lower = this.readInt32();
        const upper = this.readInt32();
        return new Long(lower, upper, true);
    }

    readInt64(): Long {
        // little-endian, lower comes first.
        const lower = this.readInt32();
        const upper = this.readInt32();
        return new Long(lower, upper, false);
    }

    readSingle(): number {
        this._checkCanRead(4);
        const val = this._view.getFloat32(this._byteOffset, true);
        this._byteOffset += 4;
        return val;
    }

    readDouble(): number {
        this._checkCanRead(8);
        const val = this._view.getFloat64(this._byteOffset, true);
        this._byteOffset += 8;
        return val;
    }

    readKleiString(): string {
        // Shifting _byteOffset is done by our other calls.  We do not need to manage it.

        const count = this.readInt32();
        if (count < 0) {
            throw new Error("Invalid byte count in readKleiString: " + count);
        }

        if (count > 0) {
            const bytes = this.readBytes(count);
            return this._stringDecoder.decode(bytes);
        }
        
        return null;
    }

    private _checkCanRead(length: number) {
        if (this._byteOffset + length >= this._view.byteLength) {
            throw new Error(`Cannot read ${length} byte${length != 1 ? "s" : ""}: Buffer length exceeded.`);
        }
    }
}