"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Vector2,
    name: "vector-2-integer",
    parse(reader, descriptor) {
        return {
            x: reader.readInt32(),
            y: reader.readInt32()
        };
    },
    write(writer, descriptor, value) {
        writer.writeInt32(value.x);
        writer.writeInt32(value.y);
    }
};
//# sourceMappingURL=vector2I.js.map