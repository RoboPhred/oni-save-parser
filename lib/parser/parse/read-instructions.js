"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReadInstruction = exports.getReaderPosition = exports.readCompressed = exports.skipBytes = exports.readKleiString = exports.readChars = exports.readDouble = exports.readSingle = exports.readInt64 = exports.readUInt64 = exports.readInt32 = exports.readUInt32 = exports.readInt16 = exports.readUInt16 = exports.readBytes = exports.readSByte = exports.readByte = void 0;
function readByte() {
    return {
        type: "read",
        dataType: "byte"
    };
}
exports.readByte = readByte;
function readSByte() {
    return {
        type: "read",
        dataType: "signed-byte"
    };
}
exports.readSByte = readSByte;
function readBytes(length) {
    return {
        type: "read",
        dataType: "byte-array",
        length
    };
}
exports.readBytes = readBytes;
function readUInt16() {
    return {
        type: "read",
        dataType: "uint-16"
    };
}
exports.readUInt16 = readUInt16;
function readInt16() {
    return {
        type: "read",
        dataType: "int-16"
    };
}
exports.readInt16 = readInt16;
function readUInt32() {
    return {
        type: "read",
        dataType: "uint-32"
    };
}
exports.readUInt32 = readUInt32;
function readInt32() {
    return {
        type: "read",
        dataType: "int-32"
    };
}
exports.readInt32 = readInt32;
function readUInt64() {
    return {
        type: "read",
        dataType: "uint-64"
    };
}
exports.readUInt64 = readUInt64;
function readInt64() {
    return {
        type: "read",
        dataType: "int-64"
    };
}
exports.readInt64 = readInt64;
function readSingle() {
    return {
        type: "read",
        dataType: "single"
    };
}
exports.readSingle = readSingle;
function readDouble() {
    return {
        type: "read",
        dataType: "double"
    };
}
exports.readDouble = readDouble;
function readChars(length) {
    return {
        type: "read",
        dataType: "chars",
        length
    };
}
exports.readChars = readChars;
function readKleiString() {
    return {
        type: "read",
        dataType: "klei-string"
    };
}
exports.readKleiString = readKleiString;
function skipBytes(length) {
    return {
        type: "read",
        dataType: "skip-bytes",
        length
    };
}
exports.skipBytes = skipBytes;
function readCompressed(parser) {
    return {
        type: "read",
        dataType: "compressed",
        parser
    };
}
exports.readCompressed = readCompressed;
function getReaderPosition() {
    return {
        type: "read",
        dataType: "reader-position"
    };
}
exports.getReaderPosition = getReaderPosition;
function isReadInstruction(value) {
    // TODO: Use a symbol or something to ensure this is a real parse instruction.
    return value && value.type === "read";
}
exports.isReadInstruction = isReadInstruction;
//# sourceMappingURL=read-instructions.js.map