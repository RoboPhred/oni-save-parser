"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagReporter = void 0;
function tagReporter(onTagStart, onTagEnd) {
    return (inst) => {
        if (inst) {
            if (inst.type === "tagged-parse:start") {
                onTagStart(inst.tag, inst.instanceName || null);
            }
            else if (onTagEnd && inst.type === "tagged-parse:end") {
                onTagEnd(inst.tag, inst.instanceName || null);
            }
        }
        return inst;
    };
}
exports.tagReporter = tagReporter;
//# sourceMappingURL=interceptors.js.map