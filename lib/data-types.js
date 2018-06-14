"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
function* parseVector2() {
    return {
        x: yield parser_1.readSingle(),
        y: yield parser_1.readSingle()
    };
}
exports.parseVector2 = parseVector2;
function* writeVector2(value) {
    yield parser_1.writeSingle(value.x);
    yield parser_1.writeSingle(value.y);
}
exports.writeVector2 = writeVector2;
function* parseVector2I() {
    return {
        x: yield parser_1.readInt32(),
        y: yield parser_1.readInt32()
    };
}
exports.parseVector2I = parseVector2I;
function* writeVector2I(value) {
    yield parser_1.writeInt32(value.x);
    yield parser_1.writeInt32(value.y);
}
exports.writeVector2I = writeVector2I;
function* parseVector3() {
    return {
        x: yield parser_1.readSingle(),
        y: yield parser_1.readSingle(),
        z: yield parser_1.readSingle()
    };
}
exports.parseVector3 = parseVector3;
function* writeVector3(value) {
    yield parser_1.writeSingle(value.x);
    yield parser_1.writeSingle(value.y);
    yield parser_1.writeSingle(value.z);
}
exports.writeVector3 = writeVector3;
function* parseQuaternion() {
    return {
        x: yield parser_1.readSingle(),
        y: yield parser_1.readSingle(),
        z: yield parser_1.readSingle(),
        w: yield parser_1.readSingle()
    };
}
exports.parseQuaternion = parseQuaternion;
function* writeQuaternion(value) {
    yield parser_1.writeSingle(value.x);
    yield parser_1.writeSingle(value.y);
    yield parser_1.writeSingle(value.z);
    yield parser_1.writeSingle(value.w);
}
exports.writeQuaternion = writeQuaternion;
//# sourceMappingURL=data-types.js.map