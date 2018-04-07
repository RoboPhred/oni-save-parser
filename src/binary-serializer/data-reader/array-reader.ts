
import {
    TextDecoder
} from "text-encoding";

import Long from "long";

import {
    Vector3,
    Quaternion
} from "../../interfaces";

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

    get position(): number {
        return this._byteOffset;
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

    readBytes(length: number): ArrayBuffer {
        this._checkCanRead(length);
        const newBuffer = this._buffer.slice(this._byteOffset, length + this._byteOffset);
        this._byteOffset += length;        
        return newBuffer;
    }

    viewBytes(length: number): ArrayBufferView {
        this._checkCanRead(length);
        const view = new DataView(this._buffer, this._byteOffset, length);
        this._byteOffset += length;
        return view;
    }

    readAllBytes(): ArrayBuffer {
        const newBuffer = this._buffer.slice(this._byteOffset);
        this._byteOffset = this._buffer.byteLength;
        return newBuffer;
    }

    viewAllBytes(): ArrayBufferView {
        const view = new DataView(this._buffer, this._byteOffset);
        this._byteOffset = this._buffer.byteLength;
        return view;
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

    readChars(length: number): string {
        const bytes = this.readBytes(length);
        return this._stringDecoder.decode(new DataView(bytes));
    }

    readKleiString(): string | null {
        // Shifting _byteOffset is done by our other calls.  We do not need to manage it.
        const count = this.readInt32();
        if (count === -1) {
            return null;
        }
        if (count === 0) {
            return "";
        }
        if (count > 0) {
            const bytes = this.readBytes(count);
            return this._stringDecoder.decode(new DataView(bytes));
        }

        throw new Error("Invalid byte count in readKleiString: " + count);
    }

    readVector3(): Vector3 {
        const vec: Vector3 = {
            x: this.readSingle(),
            y: this.readSingle(),
            z: this.readSingle()
        };
        return vec;
    }

    readQuaternion(): Quaternion {
        const q: Quaternion = {
            x: this.readSingle(),
            y: this.readSingle(),
            z: this.readSingle(),
            w: this.readSingle()
        };
        return q;
    }

    skipBytes(length: number) {
        this._checkCanRead(length);
        this._byteOffset += length;
    }

    private _checkCanRead(length: number) {
        if (this._byteOffset + length > this._view.byteLength) {
            throw new Error(`Cannot read ${length} byte${length != 1 ? "s" : ""}: Buffer length exceeded.`);
        }
    }
}