"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.Vector2ITypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Vector2I, "vector2I", reader => ({
    x: reader.readInt32(),
    y: reader.readInt32()
}), (writer, value) => {
    writer.writeInt32(value.x);
    writer.writeInt32(value.y);
});
//# sourceMappingURL=serializer.js.map