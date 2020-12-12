"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseError = void 0;
class ParseError extends Error {
    constructor(message, dataOffset) {
        super(message);
        Object.setPrototypeOf(this, ParseError.prototype);
        this.dataOffset = dataOffset;
    }
    static create(error, dataOffset) {
        if (error instanceof ParseError) {
            return error;
        }
        if (typeof error.message === "string") {
            const err = new ParseError(`Error while processing content: ${error.message}`, dataOffset);
            err.cause = () => error;
            err.stack = error.stack;
            return err;
        }
        const err = new ParseError(String(error), dataOffset);
        Error.captureStackTrace(err, ParseError.create);
        return err;
    }
}
exports.ParseError = ParseError;
//# sourceMappingURL=errors.js.map