"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparse = void 0;
const binary_serializer_1 = require("../../binary-serializer");
const write_instructions_1 = require("./write-instructions");
const errors_1 = require("../errors");
const types_1 = require("../types");
function unparse(writer, unparser, interceptor) {
    let nextValue = undefined;
    while (true) {
        let iteratorResult;
        try {
            iteratorResult = unparser.next(nextValue);
        }
        catch (e) {
            throw errors_1.ParseError.create(e, writer.position);
        }
        let { value, done } = iteratorResult;
        value = interceptor ? interceptor(value) : value;
        if (!types_1.isMetaInstruction(value)) {
            if (write_instructions_1.isWriteInstruction(value)) {
                try {
                    nextValue = executeWriteInstruction(writer, value, interceptor);
                }
                catch (e) {
                    throw errors_1.ParseError.create(e, writer.position);
                }
            }
            else if (!done) {
                throw new Error("Cannot yield a non-parse-instruction.");
            }
            else {
                nextValue = value;
            }
        }
        if (done) {
            break;
        }
    }
    return nextValue;
}
exports.unparse = unparse;
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
    "writer-position": (r) => r.position,
    "data-length:begin": (r, i) => {
        const token = {
            writePosition: r.position,
            startPosition: i.startPosition != null ? i.startPosition : r.position,
        };
        r.writeInt32(0);
        return token;
    },
    "data-length:end": (r, i) => r.replaceInt32(r.position - (i.token.startPosition + 4), i.token.writePosition),
    compressed: (r, i, interceptor) => {
        const writer = new binary_serializer_1.ZlibDataWriter();
        unparse(writer, i.unparser, interceptor);
        r.writeBytes(writer.getBytesView());
    },
};
function executeWriteInstruction(writer, inst, interceptor) {
    if (inst.type !== "write") {
        throw new Error("Expected a write parse instruction.");
    }
    const writeFunc = writeParsers[inst.dataType];
    return writeFunc(writer, inst, interceptor);
}
//# sourceMappingURL=unparser.js.map