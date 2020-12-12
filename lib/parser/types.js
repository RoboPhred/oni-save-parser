"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMetaInstruction = void 0;
const util_1 = require("util");
function isMetaInstruction(inst) {
    return util_1.isObject(inst) && !!inst.isMeta;
}
exports.isMetaInstruction = isMetaInstruction;
//# sourceMappingURL=types.js.map