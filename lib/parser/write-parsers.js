"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writeParsers = {
    byte: (r, i) => r.writeByte(i.value),
    "signed-byte": (r, i) => r.writeSByte(i.value),
    "byte-array": (r, i) => r.writeBytes(i.value),
    "uint-16": (r, i) => r.writeUInt16(i.value),
    "int-16": (r, i) => r.writeInt16(i.value),
    "uint-32": (r, i) => r.writeUInt32(i.value),
    "int-32": (r, i) => r.writeInt32(i.value),
    "uint-64": (r, i) => r.writeUInt64(i.value),
    "int-64": (r, i) => r.writeInt64(i.value),
    single: (r, i) => r.writeSingle(i.value),
    double: (r, i) => r.writeDouble(i.value),
    chars: (r, i) => r.writeChars(i.value),
    "klei-string": (r, i) => r.writeKleiString(i.value),
    "writer-position": r => r.position,
    "data-length:begin": (r, i) => {
        const token = {
            writePosition: r.position,
            startPosition: i.startPosition != null ? i.startPosition : r.position
        };
        r.writeInt32(0);
        return token;
    },
    "data-length:end": (r, i) => r.replaceInt32(r.position - (i.token.startPosition + 4), i.token.writePosition)
};
exports.default = writeParsers;
function executeWriteInstruction(writer, inst) {
    if (inst.type !== "write") {
        throw new Error("Expected a write parse instruction.");
    }
    const writeFunc = writeParsers[inst.dataType];
    return writeFunc(writer, inst);
}
exports.executeWriteInstruction = executeWriteInstruction;
//# sourceMappingURL=write-parsers.js.map