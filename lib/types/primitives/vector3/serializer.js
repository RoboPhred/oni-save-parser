"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.Vector3TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Vector3, "vector3", reader => ({
    x: reader.readSingle(),
    y: reader.readSingle(),
    z: reader.readSingle()
}), (writer, value) => {
    writer.writeSingle(value.x);
    writer.writeSingle(value.y);
    writer.writeSingle(value.z);
});
//# sourceMappingURL=serializer.js.map