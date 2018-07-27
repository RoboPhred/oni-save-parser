"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instructions_1 = require("./instructions");
function taggedParser(tag, arg1, arg2) {
    let instanceName;
    let parser;
    if (arguments.length === 2) {
        parser = arg1;
    }
    else {
        instanceName = arg1;
        parser = arg2;
    }
    return function* (...args) {
        const resolvedTag = typeof tag === "function" ? tag(...args) : tag;
        const resolvedInstance = instanceName && typeof instanceName === "function"
            ? instanceName(...args)
            : instanceName;
        yield instructions_1.taggedParseStart(resolvedTag, resolvedInstance);
        const result = yield* parser(...args);
        yield instructions_1.taggedParseEnd(resolvedTag, resolvedInstance);
        return result;
    };
}
exports.default = taggedParser;
//# sourceMappingURL=parse-tagger.js.map