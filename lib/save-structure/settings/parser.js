"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseSettings = exports.parseSettings = void 0;
const parser_1 = require("../../parser");
const utils_1 = require("../../utils");
const AssemblyTypeName = "Game+Settings";
function* parseSettings({ parseByTemplate }) {
    const typeName = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(typeName);
    if (typeName !== AssemblyTypeName) {
        throw new Error(`Expected type name "${AssemblyTypeName}" but got "${typeName}".`);
    }
    return yield* parseByTemplate(AssemblyTypeName);
}
exports.parseSettings = parseSettings;
function* unparseSettings(settings, { unparseByTemplate }) {
    yield parser_1.writeKleiString(AssemblyTypeName);
    yield* unparseByTemplate(AssemblyTypeName, settings);
}
exports.unparseSettings = unparseSettings;
//# sourceMappingURL=parser.js.map