"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../parser");
const AssemblyTypeName = "Klei.SaveFileRoot";
function* parseWorld({ parseByTemplate }) {
    const str = yield parser_1.readKleiString();
    if (str !== AssemblyTypeName) {
        throw new Error(`Expected type name "${AssemblyTypeName}" but got "${str}".`);
    }
    const world = yield* parseByTemplate(AssemblyTypeName);
    return world;
}
exports.parseWorld = parseWorld;
//# sourceMappingURL=world.js.map