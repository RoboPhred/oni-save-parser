"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Vector2I,
    name: "vector-2",
    parse(reader, descriptor) {
        return {
            x: reader.readSingle(),
            y: reader.readSingle()
        };
    },
    write(writer, descriptor, value) {
        writer.writeSingle(value.x);
        writer.writeSingle(value.y);
    }
};
//# sourceMappingURL=vector2.js.map