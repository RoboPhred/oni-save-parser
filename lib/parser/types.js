"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
function isMetaInstruction(inst) {
    return util_1.isObject(inst) && !!inst.isMeta;
}
exports.isMetaInstruction = isMetaInstruction;
//# sourceMappingURL=types.js.map