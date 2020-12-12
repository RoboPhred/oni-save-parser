"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const binary_serializer_1 = require("../../binary-serializer");
const read_instructions_1 = require("./read-instructions");
const errors_1 = require("../errors");
const types_1 = require("../types");
function parse(reader, readParser, interceptor) {
    let nextValue = undefined;
    while (true) {
        let iteratorResult;
        try {
            iteratorResult = readParser.next(nextValue);
        }
        catch (e) {
            throw errors_1.ParseError.create(e, reader.position);
        }
        let { value, done } = iteratorResult;
        value = interceptor ? interceptor(value) : value;
        if (!types_1.isMetaInstruction(value)) {
            if (read_instructions_1.isReadInstruction(value)) {
                try {
                    nextValue = executeReadInstruction(reader, value, interceptor);
                }
                catch (e) {
                    const err = errors_1.ParseError.create(e, reader.position);
                    throw err;
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
exports.parse = parse;
const readParsers = {
    byte: (r) => r.readByte(),
    "signed-byte": (r) => r.readSByte(),
    "byte-array": (r, i) => i.length == null ? r.readAllBytes() : r.readBytes(i.length),
    "uint-16": (r) => r.readUInt16(),
    "int-16": (r) => r.readInt16(),
    "uint-32": (r) => r.readUInt32(),
    "int-32": (r) => r.readInt32(),
    "uint-64": (r) => r.readUInt64(),
    "int-64": (r) => r.readInt64(),
    single: (r) => r.readSingle(),
    double: (r) => r.readDouble(),
    chars: (r, i) => r.readChars(i.length),
    "klei-string": (r) => r.readKleiString(),
    "skip-bytes": (r, i) => r.skipBytes(i.length),
    compressed: (r, i, interceptor) => {
        const bytes = r.readAllBytes();
        const reader = new binary_serializer_1.ZlibDataReader(new Uint8Array(bytes));
        const result = parse(reader, i.parser, interceptor);
        return result;
    },
    "reader-position": (r) => r.position,
};
function executeReadInstruction(reader, inst, interceptor) {
    if (inst.type !== "read") {
        throw new Error("Expected a read parse instruction.");
    }
    const readFunc = readParsers[inst.dataType];
    return readFunc(reader, inst, interceptor);
}
//# sourceMappingURL=parser.js.map