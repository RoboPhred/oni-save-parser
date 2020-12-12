"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayDataReader = void 0;
const text_encoding_1 = require("text-encoding");
class ArrayDataReader {
    constructor(buffer) {
        this._byteOffset = 0;
        this._stringDecoder = new text_encoding_1.TextDecoder("utf-8");
        this._buffer = buffer;
        this._view = new DataView(buffer);
    }
    get position() {
        return this._byteOffset;
    }
    readByte() {
        this._checkCanRead(1);
        const val = this._view.getUint8(this._byteOffset);
        this._byteOffset += 1;
        return val;
    }
    readSByte() {
        this._checkCanRead(1);
        const val = this._view.getInt8(this._byteOffset);
        this._byteOffset += 1;
        return val;
    }
    readBytes(length) {
        this._checkCanRead(length);
        const newBuffer = this._buffer.slice(this._byteOffset, length + this._byteOffset);
        this._byteOffset += length;
        return newBuffer;
    }
    viewBytes(length) {
        this._checkCanRead(length);
        const view = new DataView(this._buffer, this._byteOffset, length);
        this._byteOffset += length;
        return view;
    }
    readAllBytes() {
        const newBuffer = this._buffer.slice(this._byteOffset);
        this._byteOffset = this._buffer.byteLength;
        return newBuffer;
    }
    viewAllBytes() {
        const view = new Uint8Array(this._buffer, this._byteOffset);
        this._byteOffset = this._buffer.byteLength;
        return view;
    }
    readUInt16() {
        this._checkCanRead(2);
        const val = this._view.getUint16(this._byteOffset, true);
        this._byteOffset += 2;
        return val;
    }
    readInt16() {
        this._checkCanRead(2);
        const val = this._view.getInt16(this._byteOffset, true);
        this._byteOffset += 2;
        return val;
    }
    readUInt32() {
        this._checkCanRead(4);
        const val = this._view.getUint32(this._byteOffset, true);
        this._byteOffset += 4;
        return val;
    }
    readInt32() {
        this._checkCanRead(4);
        const val = this._view.getInt32(this._byteOffset, true);
        this._byteOffset += 4;
        return val;
    }
    readUInt64() {
        // little-endian, lower comes first.
        const lower = this.readInt32();
        const upper = this.readInt32();
        //return new Long(lower, upper, true);
        return {
            unsigned: true,
            lower,
            upper
        };
    }
    readInt64() {
        // little-endian, lower comes first.
        const lower = this.readInt32();
        const upper = this.readInt32();
        return {
            unsigned: false,
            lower,
            upper
        };
    }
    readSingle() {
        this._checkCanRead(4);
        const val = this._view.getFloat32(this._byteOffset, true);
        this._byteOffset += 4;
        return val;
    }
    readDouble() {
        this._checkCanRead(8);
        const val = this._view.getFloat64(this._byteOffset, true);
        this._byteOffset += 8;
        return val;
    }
    readChars(length) {
        // Note: readChars deals with unencoded single-byte utf-8 chars.
        //  This is not safe for multi-byte characters, and is only used for
        //  places dealing with fixed length single-byte values.
        const bytes = new Uint8Array(this.readBytes(length));
        let str = "";
        for (let i = 0; i < bytes.length; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return str;
    }
    readKleiString() {
        // Shifting _byteOffset is done by our other calls.  We do not need to manage it.
        const count = this.readInt32();
        if (count === -1) {
            return null;
        }
        if (count === 0) {
            return "";
        }
        if (count > 0) {
            // Note: the length is the encoded length, not the character count.
            const bytes = this.readBytes(count);
            return this._stringDecoder.decode(new DataView(bytes));
        }
        throw new Error("Invalid byte count in readKleiString: " + count);
    }
    readVector3() {
        const vec = {
            x: this.readSingle(),
            y: this.readSingle(),
            z: this.readSingle()
        };
        return vec;
    }
    readQuaternion() {
        const q = {
            x: this.readSingle(),
            y: this.readSingle(),
            z: this.readSingle(),
            w: this.readSingle()
        };
        return q;
    }
    skipBytes(length) {
        this._checkCanRead(length);
        this._byteOffset += length;
    }
    _checkCanRead(length) {
        if (this._byteOffset + length > this._view.byteLength) {
            throw new Error(`Cannot read ${length} byte${length != 1 ? "s" : ""}: Buffer length exceeded.`);
        }
    }
}
exports.ArrayDataReader = ArrayDataReader;
//# sourceMappingURL=array-reader.js.map