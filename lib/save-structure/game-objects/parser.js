"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../../parser");
const utils_1 = require("../../utils");
const game_object_parser_1 = require("./game-object-parser");
function* parseGameObjects(templateParser) {
    const count = yield parser_1.readInt32();
    const groups = new Array(count);
    for (let i = 0; i < count; i++) {
        groups[i] = yield* parseGameObjectPrefabSet(templateParser);
    }
    return groups;
}
exports.parseGameObjects = parseGameObjects;
function* unparseGameObjects(groups, templateWriter) {
    yield parser_1.writeInt32(groups.length);
    for (const group of groups) {
        yield* unparseGameObjectPrefabSet(group, templateWriter);
    }
}
exports.unparseGameObjects = unparseGameObjects;
function* parseGameObjectPrefabSet(templateParser) {
    const prefabName = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(prefabName);
    const instanceCount = yield parser_1.readInt32();
    const dataLength = yield parser_1.readInt32();
    const preParsePosition = yield parser_1.getReaderPosition();
    const gameObjects = new Array(instanceCount);
    for (let i = 0; i < instanceCount; i++) {
        gameObjects[i] = yield* game_object_parser_1.parseGameObject(templateParser);
    }
    const postParsePosition = yield parser_1.getReaderPosition();
    const bytesRemaining = dataLength - (postParsePosition - preParsePosition);
    if (bytesRemaining < 0) {
        throw new Error(`GameObject "${prefabName}" parse consumed ${-bytesRemaining} more bytes than its declared length of ${dataLength}.`);
    }
    else if (bytesRemaining > 0) {
        // We could skip the bytes, but if we want to write data back, we better know what those bytes were.
        //  Each GameObject itself tracks data length, so we should be covered.  Anything that is missing
        //  is a sign of a parse issue.
        throw new Error(`GameObject "${prefabName}" parse consumed ${bytesRemaining} less bytes than its declared length of ${dataLength}.`);
    }
    const group = {
        name: prefabName,
        gameObjects
    };
    return group;
}
function* unparseGameObjectPrefabSet(group, templateWriter) {
    const { name, gameObjects } = group;
    yield parser_1.writeKleiString(name);
    yield parser_1.writeInt32(gameObjects.length);
    const lengthToken = yield parser_1.writeDataLengthBegin();
    for (const gameObject of gameObjects) {
        yield* game_object_parser_1.unparseGameObject(gameObject, templateWriter);
    }
    yield parser_1.writeDataLengthEnd(lengthToken);
}
//# sourceMappingURL=parser.js.map