"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseGameObjects = exports.parseGameObjects = void 0;
const parser_1 = require("../../parser");
const parser_2 = require("./game-object-group/parser");
function* parseGameObjects(templateParser) {
    const count = yield parser_1.readInt32();
    const groups = new Array(count);
    for (let i = 0; i < count; i++) {
        groups[i] = yield* parser_2.parseGameObjectGroup(templateParser);
    }
    return groups;
}
exports.parseGameObjects = parseGameObjects;
function* unparseGameObjects(lists, templateWriter) {
    yield parser_1.writeInt32(lists.length);
    for (const group of lists) {
        yield* parser_2.unparseGameObjectGroup(group, templateWriter);
    }
}
exports.unparseGameObjects = unparseGameObjects;
//# sourceMappingURL=parser.js.map