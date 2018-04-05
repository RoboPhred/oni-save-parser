"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_encoding_1 = require("text-encoding");
/**
 * Increase buffer by 1 mb each time we run out of length.
 */
// TODO: Explore this to find a good increment size.
const BUFFER_INCREASE = 1048576;
class ArrayDataWriter {
    constructor() {
        this._byteOffset = 0;
        this._textEncoder = new text_encoding_1.TextEncoder("utf-8");
        this._buffer = new Uint8Array(BUFFER_INCREASE);
        this._view = new DataView(this._buffer.buffer);
    }
    get position() {
        return this._byteOffset;
    }
    writeByte(value) {
        this._ensureCanWrite(1);
        this._view.setUint8(this._byteOffset, value);
        this._byteOffset += 1;
    }
    writeSByte(value) {
        this._ensureCanWrite(1);
        this._view.setInt8(this._byteOffset, value);
        this._byteOffset += 1;
    }
    writeBytes(value) {
        this._ensureCanWrite(value.byteLength);
        this._buffer.set(new Uint8Array(value.buffer), this._byteOffset);
        this._byteOffset += value.byteLength;
    }
    writeUInt16(value) {
        this._ensureCanWrite(2);
        this._view.setUint16(this._byteOffset, value, true);
        this._byteOffset += 2;
    }
    writeInt16(value) {
        this._ensureCanWrite(2);
        this._view.setInt16(this._byteOffset, value, true);
        this._byteOffset += 2;
    }
    writeUInt32(value) {
        this._ensureCanWrite(4);
        this._view.setUint32(this._byteOffset, value, true);
        this._byteOffset += 4;
    }
    writeInt32(value) {
        this._ensureCanWrite(4);
        this._view.setUint32(this._byteOffset, value, true);
        this._byteOffset += 4;
    }
    writeUInt64(value) {
        value = value.toUnsigned();
        // little-endian, lower comes first.
        this.writeInt32(value.low);
        this.writeInt32(value.high);
    }
    writeInt64(value) {
        value = value.toSigned();
        // little-endian, lower comes first.
        this.writeInt32(value.low);
        this.writeInt32(value.high);
    }
    writeSingle(value) {
        this._ensureCanWrite(4);
        const val = this._view.setFloat32(this._byteOffset, value, true);
        this._byteOffset += 4;
        return val;
    }
    writeDouble(value) {
        this._ensureCanWrite(8);
        const val = this._view.setFloat64(this._byteOffset, value, true);
        this._byteOffset += 8;
        return val;
    }
    writeChars(value) {
        const encoded = this._textEncoder.encode(value);
        this._ensureCanWrite(encoded.length);
        this._buffer.set(encoded, this._byteOffset);
        this._byteOffset += encoded.length;
    }
    writeKleiString(value) {
        if (value === null) {
            this.writeInt32(-1);
        }
        else if (value.length === 0) {
            this.writeInt32(0);
        }
        else {
            this.writeInt32(value.length);
            this.writeChars(value);
        }
    }
    writeVector3(value) {
        this.writeSingle(value.x);
        this.writeSingle(value.y);
        this.writeSingle(value.z);
    }
    writeQuaternion(value) {
        this.writeSingle(value.x);
        this.writeSingle(value.y);
        this.writeSingle(value.z);
        this.writeSingle(value.w);
    }
    getBytes() {
        const buffer = new ArrayBuffer(this._byteOffset);
        (new Uint8Array(buffer)).set(this._buffer, this._byteOffset);
        return buffer;
    }
    /**
     * Ensure there is enough room in the buffer to write
     * the specified amount of bytes.
     * @param length The number of bytes intending to be written.
     */
    _ensureCanWrite(length) {
        const increaseBy = (this._byteOffset + length) - this._buffer.length;
        if (increaseBy > 0) {
            this._increaseBuffer(increaseBy);
        }
    }
    _increaseBuffer(size) {
        let increaseSize = BUFFER_INCREASE;
        if (increaseSize < size) {
            increaseSize += size;
        }
        const newLength = this._buffer.length + increaseSize;
        const newBuffer = new Uint8Array(newLength);
        newBuffer.set(this._buffer, 0);
        this._buffer = newBuffer;
        this._view = new DataView(this._buffer.buffer);
    }
}
exports.ArrayDataWriter = ArrayDataWriter;
//# sourceMappingURL=array-writer.js.map