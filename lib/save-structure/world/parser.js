"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseWorld = exports.parseWorld = void 0;
const parser_1 = require("../../parser");
const utils_1 = require("../../utils");
const AssemblyTypeName = "Klei.SaveFileRoot";
function* parseWorld({ parseByTemplate }) {
    const typeName = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(typeName);
    if (typeName !== AssemblyTypeName) {
        throw new Error(`Expected type name "${AssemblyTypeName}" but got "${typeName}".`);
    }
    const world = yield* parseByTemplate(AssemblyTypeName);
    return world;
}
exports.parseWorld = parseWorld;
function* unparseWorld(world, { unparseByTemplate }) {
    yield parser_1.writeKleiString(AssemblyTypeName);
    yield* unparseByTemplate(AssemblyTypeName, world);
}
exports.unparseWorld = unparseWorld;
//# sourceMappingURL=parser.js.map