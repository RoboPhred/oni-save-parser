"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E_VERSION_MINOR = exports.E_VERSION_MAJOR = exports.validateVersion = exports.CURRENT_VERSION_MINOR = exports.CURRENT_VERSION_MAJOR = void 0;
exports.CURRENT_VERSION_MAJOR = 7;
exports.CURRENT_VERSION_MINOR = [17, 23];
function validateVersion(major, minor, strictness = "minor") {
    if (!matchVersion(major, exports.CURRENT_VERSION_MAJOR) ||
        (strictness == "minor" && !matchVersion(minor, exports.CURRENT_VERSION_MINOR))) {
        const err = new Error(`Save version "${major}.${minor}" is not compatible with this parser.  Expected version "${exports.CURRENT_VERSION_MAJOR}.${exports.CURRENT_VERSION_MINOR}".`);
        err.code =
            major !== exports.CURRENT_VERSION_MAJOR ? exports.E_VERSION_MAJOR : exports.E_VERSION_MINOR;
        throw err;
    }
}
exports.validateVersion = validateVersion;
function matchVersion(currentVersion, supportedVersion) {
    if (Array.isArray(supportedVersion)) {
        return supportedVersion.indexOf(currentVersion) !== -1;
    }
    return currentVersion === supportedVersion;
}
exports.E_VERSION_MAJOR = "E_VERSION_MAJOR";
exports.E_VERSION_MINOR = "E_VERSION_MINOR";
//# sourceMappingURL=version-validator.js.map