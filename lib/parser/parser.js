"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const read_instructions_1 = require("./read-instructions");
const read_parsers_1 = require("./read-parsers");
const write_instructions_1 = require("./write-instructions");
const write_parsers_1 = require("./write-parsers");
function parse(reader, readParser) {
    let nextValue = undefined;
    while (true) {
        const { value, done } = readParser.next(nextValue);
        if (read_instructions_1.isReadInstruction(value)) {
            nextValue = read_parsers_1.executeReadInstruction(reader, value);
        }
        else if (!done) {
            throw new Error("Cannot yield a non-parse-instruction.");
        }
        else {
            nextValue = value;
        }
        if (done) {
            break;
        }
    }
    return nextValue;
}
exports.parse = parse;
function write(writer, writeParser) {
    let nextValue = undefined;
    while (true) {
        const { value, done } = writeParser.next(nextValue);
        if (write_instructions_1.isWriteInstruction(value)) {
            nextValue = write_parsers_1.executeWriteInstruction(writer, value);
        }
        else if (!done) {
            throw new Error("Cannot yield a non-parse-instruction.");
        }
        else {
            nextValue = value;
        }
        if (done) {
            break;
        }
    }
    return nextValue;
}
exports.write = write;
//# sourceMappingURL=parser.js.map