"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENT_VERSION_MAJOR = 7;
exports.CURRENT_VERSION_MINOR = 16;
function validateVersion(major, minor, strictness = "minor") {
    if (major !== exports.CURRENT_VERSION_MAJOR ||
        (strictness == "minor" && minor !== exports.CURRENT_VERSION_MINOR)) {
        const err = new Error(`Save version "${major}.${minor}" is not compatible with this parser.  Expected version "${exports.CURRENT_VERSION_MAJOR}.${exports.CURRENT_VERSION_MINOR}".`);
        err.code =
            major !== exports.CURRENT_VERSION_MAJOR ? exports.E_VERSION_MAJOR : exports.E_VERSION_MINOR;
        throw err;
    }
}
exports.validateVersion = validateVersion;
exports.E_VERSION_MAJOR = "E_VERSION_MAJOR";
exports.E_VERSION_MINOR = "E_VERSION_MINOR";
//# sourceMappingURL=version-validator.js.map