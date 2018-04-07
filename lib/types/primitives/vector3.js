"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Vector3,
    name: "vector-3",
    parse(reader, descriptor) {
        return {
            x: reader.readSingle(),
            y: reader.readSingle(),
            z: reader.readSingle()
        };
    },
    write(writer, descriptor, value) {
        writer.writeSingle(value.x);
        writer.writeSingle(value.y);
        writer.writeSingle(value.z);
    }
};
//# sourceMappingURL=vector3.js.map