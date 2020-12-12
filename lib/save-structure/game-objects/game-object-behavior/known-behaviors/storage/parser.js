"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseStorageExtraData = exports.parseStorageExtraData = void 0;
const utils_1 = require("../../../../../utils");
const parser_1 = require("../../../../../parser");
const parser_2 = require("../../../game-object/parser");
function* parseStorageExtraData(templateParser) {
    const itemCount = yield parser_1.readInt32();
    const items = new Array(itemCount);
    for (let i = 0; i < itemCount; i++) {
        const name = yield parser_1.readKleiString();
        utils_1.validateDotNetIdentifierName(name);
        const gameObject = yield* parser_2.parseGameObject(templateParser);
        items[i] = Object.assign({ name }, gameObject);
    }
    return items;
}
exports.parseStorageExtraData = parseStorageExtraData;
function* unparseStorageExtraData(extraData, templateUnparser) {
    yield parser_1.writeInt32(extraData.length);
    for (const gameObject of extraData) {
        yield parser_1.writeKleiString(gameObject.name);
        yield* parser_2.unparseGameObject(gameObject, templateUnparser);
    }
}
exports.unparseStorageExtraData = unparseStorageExtraData;
//# sourceMappingURL=parser.js.map