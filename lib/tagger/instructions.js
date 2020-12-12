"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taggedParseEnd = exports.taggedParseStart = void 0;
function taggedParseStart(tag, instanceName) {
    return {
        type: "tagged-parse:start",
        isMeta: true,
        tag,
        instanceName
    };
}
exports.taggedParseStart = taggedParseStart;
function taggedParseEnd(tag, instanceName) {
    return {
        type: "tagged-parse:end",
        isMeta: true,
        tag,
        instanceName
    };
}
exports.taggedParseEnd = taggedParseEnd;
//# sourceMappingURL=instructions.js.map