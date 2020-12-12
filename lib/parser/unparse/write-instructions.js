"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWriteInstruction = exports.writeCompressed = exports.writeDataLengthEnd = exports.writeDataLengthBegin = exports.getWriterPosition = exports.writeKleiString = exports.writeChars = exports.writeDouble = exports.writeSingle = exports.writeInt64 = exports.writeUInt64 = exports.writeInt32 = exports.writeUInt32 = exports.writeInt16 = exports.writeUInt16 = exports.writeBytes = exports.writeSByte = exports.writeByte = void 0;
function writeByte(value) {
    return {
        type: "write",
        dataType: "byte",
        value
    };
}
exports.writeByte = writeByte;
function writeSByte(value) {
    return {
        type: "write",
        dataType: "signed-byte",
        value
    };
}
exports.writeSByte = writeSByte;
function writeBytes(bytes) {
    return {
        type: "write",
        dataType: "byte-array",
        value: bytes
    };
}
exports.writeBytes = writeBytes;
function writeUInt16(value) {
    return {
        type: "write",
        dataType: "uint-16",
        value
    };
}
exports.writeUInt16 = writeUInt16;
function writeInt16(value) {
    return {
        type: "write",
        dataType: "int-16",
        value
    };
}
exports.writeInt16 = writeInt16;
function writeUInt32(value) {
    return {
        type: "write",
        dataType: "uint-32",
        value
    };
}
exports.writeUInt32 = writeUInt32;
function writeInt32(value) {
    return {
        type: "write",
        dataType: "int-32",
        value
    };
}
exports.writeInt32 = writeInt32;
function writeUInt64(value) {
    return {
        type: "write",
        dataType: "uint-64",
        value
    };
}
exports.writeUInt64 = writeUInt64;
function writeInt64(value) {
    return {
        type: "write",
        dataType: "int-64",
        value
    };
}
exports.writeInt64 = writeInt64;
function writeSingle(value) {
    return {
        type: "write",
        dataType: "single",
        value
    };
}
exports.writeSingle = writeSingle;
function writeDouble(value) {
    return {
        type: "write",
        dataType: "double",
        value
    };
}
exports.writeDouble = writeDouble;
function writeChars(value) {
    return {
        type: "write",
        dataType: "chars",
        value
    };
}
exports.writeChars = writeChars;
function writeKleiString(value) {
    return {
        type: "write",
        dataType: "klei-string",
        value
    };
}
exports.writeKleiString = writeKleiString;
function getWriterPosition() {
    return {
        type: "write",
        dataType: "writer-position"
    };
}
exports.getWriterPosition = getWriterPosition;
function writeDataLengthBegin(startPosition) {
    return {
        type: "write",
        dataType: "data-length:begin",
        startPosition
    };
}
exports.writeDataLengthBegin = writeDataLengthBegin;
function writeDataLengthEnd(token) {
    return {
        type: "write",
        dataType: "data-length:end",
        token
    };
}
exports.writeDataLengthEnd = writeDataLengthEnd;
function writeCompressed(unparser) {
    return {
        type: "write",
        dataType: "compressed",
        unparser
    };
}
exports.writeCompressed = writeCompressed;
function isWriteInstruction(value) {
    // TODO: Use a symbol or something to ensure this is a real parse instruction.
    return value && value.type === "write";
}
exports.isWriteInstruction = isWriteInstruction;
//# sourceMappingURL=write-instructions.js.map