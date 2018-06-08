"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.Vector2TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Vector2, "vector2", reader => ({
    x: reader.readSingle(),
    y: reader.readSingle()
}), (writer, value) => {
    writer.writeSingle(value.x);
    writer.writeSingle(value.y);
});
//# sourceMappingURL=serializer.js.map