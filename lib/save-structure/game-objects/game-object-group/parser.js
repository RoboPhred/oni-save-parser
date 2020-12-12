"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseGameObjectGroup = exports.parseGameObjectGroup = void 0;
const utils_1 = require("../../../utils");
const parser_1 = require("../../../parser");
const parse_tagger_1 = __importDefault(require("../../../tagger/parse-tagger"));
const progress_1 = require("../../../progress");
const parser_2 = require("../game-object/parser");
function* parseGameObjectGroup(templateParser) {
    const prefabName = yield parser_1.readKleiString();
    utils_1.validateDotNetIdentifierName(prefabName);
    return yield* parseNamedGameObjectGroup(prefabName, templateParser);
}
exports.parseGameObjectGroup = parseGameObjectGroup;
const parseNamedGameObjectGroup = parse_tagger_1.default("GameObjectGroup", prefabName => prefabName, function* (prefabName, templateParser) {
    const instanceCount = yield parser_1.readInt32();
    const dataLength = yield parser_1.readInt32();
    const preParsePosition = yield parser_1.getReaderPosition();
    const gameObjects = new Array(instanceCount);
    for (let i = 0; i < instanceCount; i++) {
        yield progress_1.reportProgress(`GameObjectGroup::${prefabName}::${i}`);
        gameObjects[i] = yield* parser_2.parseGameObject(templateParser);
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
});
function* unparseGameObjectGroup(group, templateUnparser) {
    yield* unparseTaggedGameObjectGroup(group, templateUnparser);
}
exports.unparseGameObjectGroup = unparseGameObjectGroup;
const unparseTaggedGameObjectGroup = parse_tagger_1.default("GameObjectGroup", group => group.name, function* (group, templateUnparser) {
    const { name, gameObjects } = group;
    yield parser_1.writeKleiString(name);
    yield parser_1.writeInt32(gameObjects.length);
    const lengthToken = yield parser_1.writeDataLengthBegin();
    for (let i = 0; i < gameObjects.length; i++) {
        const gameObject = gameObjects[i];
        yield progress_1.reportProgress(`GameObjectGroup::${name}::${i}`);
        yield* parser_2.unparseGameObject(gameObject, templateUnparser);
    }
    yield parser_1.writeDataLengthEnd(lengthToken);
});
//# sourceMappingURL=parser.js.map