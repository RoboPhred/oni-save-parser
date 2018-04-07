"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Byte,
    name: "byte",
    parse(reader, descriptor) {
        return reader.readByte();
    },
    write(writer, descriptor, value) {
        writer.writeByte(value);
    }
};
//# sourceMappingURL=byte.js.map