"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../parser");
const utils_1 = require("../utils");
const data_types_1 = require("../data-types");
function* parseGameObjects(templateParser) {
    const count = yield parser_1.readInt32();
    const groups = new Array(count);
    for (let i = 0; i < count; i++) {
        groups[i] = yield* parseGameObjectPrefabSet(templateParser);
    }
    return groups;
}
exports.parseGameObjects = parseGameObjects;
function* parseGameObjectPrefabSet(templateParser) {
    const prefabName = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(prefabName);
    const instanceCount = yield parser_1.readInt32();
    const dataLength = yield parser_1.readInt32();
    const preParsePosition = yield parser_1.getReaderPosition();
    const gameObjects = new Array(instanceCount);
    for (let i = 0; i < instanceCount; i++) {
        gameObjects[i] = yield* parseGameObject(templateParser);
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
function* parseGameObject(templateParser) {
    const position = yield* data_types_1.parseVector3();
    const rotation = yield* data_types_1.parseQuaternion();
    const scale = yield* data_types_1.parseVector3();
    const folder = yield parser_1.readByte();
    const behaviorCount = yield parser_1.readInt32();
    const behaviors = new Array(behaviorCount);
    for (let i = 0; i < behaviorCount; i++) {
        behaviors[i] = yield* parseGameObjectBehavior(templateParser);
    }
    const gameObject = {
        position,
        rotation,
        scale,
        folder,
        behaviors
    };
    return gameObject;
}
function* parseGameObjectBehavior({ parseByTemplate }) {
    const name = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(name);
    const dataLength = yield parser_1.readInt32();
    const preParsePosition = yield parser_1.getReaderPosition();
    const templateData = yield* parseByTemplate(name);
    let extraRaw = undefined;
    const postParsePosition = yield parser_1.getReaderPosition();
    const dataRemaining = dataLength - (postParsePosition - preParsePosition);
    if (dataRemaining < 0) {
        throw new Error(`GameObjectBehavior "${name}" deserialized more type data than expected.`);
    }
    else if (dataRemaining > 0) {
        //  TODO: Implement extra data parsing for specific behaviors that implement ISaveLoadableDetails.
        extraRaw = yield parser_1.readBytes(dataRemaining);
    }
    const behavior = {
        name,
        templateData,
        extraRaw
    };
    return behavior;
}
//# sourceMappingURL=game-objects.js.map