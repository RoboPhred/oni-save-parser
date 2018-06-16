"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readParsers = {
    byte: r => r.readByte(),
    "signed-byte": r => r.readSByte(),
    "byte-array": (r, i) => r.readBytes(i.length),
    "uint-16": r => r.readUInt16(),
    "int-16": r => r.readInt16(),
    "uint-32": r => r.readUInt32(),
    "int-32": r => r.readInt32(),
    "uint-64": r => r.readUInt64(),
    "int-64": r => r.readInt64(),
    single: r => r.readSingle(),
    double: r => r.readDouble(),
    chars: (r, i) => r.readChars(i.length),
    "klei-string": r => r.readKleiString(),
    "skip-bytes": (r, i) => r.skipBytes(i.length),
    "reader-position": r => r.position
};
exports.default = readParsers;
function executeReadInstruction(reader, inst) {
    if (inst.type !== "read") {
        throw new Error("Expected a read parse instruction.");
    }
    const readFunc = readParsers[inst.dataType];
    return readFunc(reader, inst);
}
exports.executeReadInstruction = executeReadInstruction;
//# sourceMappingURL=read-parsers.js.map