"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../parser");
const utils_1 = require("../utils");
const AssemblyTypeName = "Game+Settings";
function* parseSaveSettings({ parseByTemplate }) {
    const typeName = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(typeName);
    if (typeName !== AssemblyTypeName) {
        throw new Error(`Expected type name "${AssemblyTypeName}" but got "${typeName}".`);
    }
    return yield* parseByTemplate(AssemblyTypeName);
}
exports.parseSaveSettings = parseSaveSettings;
//# sourceMappingURL=save-settings.js.map