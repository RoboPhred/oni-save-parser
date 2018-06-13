"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readParsers = {
    byte: r => r.readByte(),
    "signed-byte": r => r.readSByte(),
    "byte-array": (r, i) => r.readBytes(instLength(i)),
    "uint-16": r => r.readUInt16(),
    "int-16": r => r.readInt16(),
    "uint-32": r => r.readUInt32(),
    "int-32": r => r.readInt32(),
    "uint-64": r => r.readUInt64(),
    "int-64": r => r.readInt64(),
    single: r => r.readSingle(),
    double: r => r.readDouble(),
    chars: (r, i) => r.readChars(instLength(i)),
    "klei-string": r => r.readKleiString(),
    "skip-bytes": (r, i) => r.skipBytes(instLength(i)),
    "reader-position": r => r.position
};
exports.default = readParsers;
function instLength(inst) {
    if (typeof inst.length !== "number" || inst.length <= 0) {
        throw new Error("Expected length >= 0");
    }
    return inst.length;
}
//# sourceMappingURL=read-parsers.js.map