"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../../parser");
const utils_1 = require("../../utils");
const data_types_1 = require("../../data-types");
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
function* unparseGameObjectPrefabSet(group, templateWriter) {
    const { name, gameObjects } = group;
    yield parser_1.writeKleiString(name);
    yield parser_1.writeInt32(gameObjects.length);
    const lengthToken = yield parser_1.writeDataLengthBegin();
    for (const gameObject of gameObjects) {
        yield* unparseGameObject(gameObject, templateWriter);
    }
    yield parser_1.writeDataLengthEnd(lengthToken);
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
function* unparseGameObject(gameObject, templateWriter) {
    const { position, rotation, scale, folder, behaviors } = gameObject;
    yield* data_types_1.unparseVector3(position);
    yield* data_types_1.unparseQuaternion(rotation);
    yield* data_types_1.unparseVector3(scale);
    yield parser_1.writeByte(folder);
    yield parser_1.writeInt32(behaviors.length);
    for (const behavior of behaviors) {
        yield* unparseGameObjectBehavior(behavior, templateWriter);
    }
}
function* parseGameObjectBehavior({ parseByTemplate }) {
    const name = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(name);
    const dataLength = yield parser_1.readInt32();
    const preParsePosition = yield parser_1.getReaderPosition();
    const templateData = yield* parseByTemplate(name);
    const postParsePosition = yield parser_1.getReaderPosition();
    let extraRaw = undefined;
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
function* unparseGameObjectBehavior(behavior, { unparseByTemplate }) {
    const { name, templateData, extraRaw } = behavior;
    yield parser_1.writeKleiString(name);
    const lengthToken = yield parser_1.writeDataLengthBegin();
    yield* unparseByTemplate(name, templateData);
    if (extraRaw) {
        yield parser_1.writeBytes(extraRaw);
    }
    yield parser_1.writeDataLengthEnd(lengthToken);
}
//# sourceMappingURL=parser.js.map