"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../parser");
const utils_1 = require("../utils");
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
function* writeWorld(world, { writeByTemplate }) {
    yield parser_1.writeKleiString(AssemblyTypeName);
    yield* writeByTemplate(AssemblyTypeName, world);
}
exports.writeWorld = writeWorld;
//# sourceMappingURL=world.js.map