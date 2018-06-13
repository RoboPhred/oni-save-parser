"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_instructions_1 = require("./read-instructions");
const read_parsers_1 = __importDefault(require("./read-parsers"));
function parse(reader, parser) {
    let nextValue = undefined;
    while (true) {
        const { value, done } = parser.next(nextValue);
        if (read_instructions_1.isReadInstruction(value)) {
            nextValue = executeReadInstruction(reader, value);
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
function executeReadInstruction(reader, inst) {
    if (inst.type !== "read") {
        throw new Error("Expected a read parse instruction.");
    }
    return read_parsers_1.default[inst.dataType](reader, inst);
}
//# sourceMappingURL=parser.js.map