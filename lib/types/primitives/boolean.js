"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Boolean,
    name: "boolean",
    parse(reader, descriptor) {
        return reader.readByte() === 1;
    },
    write(writer, descriptor, value) {
        writer.writeByte(value ? 1 : 0);
    }
};
//# sourceMappingURL=boolean.js.map