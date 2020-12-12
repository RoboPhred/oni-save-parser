"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseGameObject = exports.parseGameObject = void 0;
const parser_1 = require("../../../parser");
const data_types_parser_1 = require("../../../save-structure/data-types/data-types-parser");
const parser_2 = require("../game-object-behavior/parser");
function* parseGameObject(templateParser) {
    const position = yield* data_types_parser_1.parseVector3();
    const rotation = yield* data_types_parser_1.parseQuaternion();
    const scale = yield* data_types_parser_1.parseVector3();
    const folder = yield parser_1.readByte();
    const behaviorCount = yield parser_1.readInt32();
    const behaviors = new Array(behaviorCount);
    for (let i = 0; i < behaviorCount; i++) {
        behaviors[i] = yield* parser_2.parseGameObjectBehavior(templateParser);
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
exports.parseGameObject = parseGameObject;
function* unparseGameObject(gameObject, templateUnparser) {
    const { position, rotation, scale, folder, behaviors } = gameObject;
    yield* data_types_parser_1.unparseVector3(position);
    yield* data_types_parser_1.unparseQuaternion(rotation);
    yield* data_types_parser_1.unparseVector3(scale);
    yield parser_1.writeByte(folder);
    yield parser_1.writeInt32(behaviors.length);
    for (const behavior of behaviors) {
        yield* parser_2.unparseGameObjectBehavior(behavior, templateUnparser);
    }
}
exports.unparseGameObject = unparseGameObject;
//# sourceMappingURL=parser.js.map