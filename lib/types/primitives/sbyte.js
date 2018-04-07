"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.SByte,
    name: "signed-byte",
    parse(reader, descriptor) {
        return reader.readSByte();
    },
    write(writer, descriptor, value) {
        writer.writeSByte(value);
    }
};
//# sourceMappingURL=sbyte.js.map