"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParseError extends Error {
    constructor(message, dataOffset) {
        super(message);
        Object.setPrototypeOf(this, ParseError);
        this.dataOffset = dataOffset;
    }
    static create(error, dataOffset) {
        if (error instanceof ParseError) {
            return error;
        }
        if (typeof error.message === "string") {
            const err = new ParseError(`Error while processing content: ${error.message}`, dataOffset);
            err.cause = () => error;
            return err;
        }
        return new ParseError(String(error), dataOffset);
    }
}
exports.ParseError = ParseError;
//# sourceMappingURL=errors.js.map