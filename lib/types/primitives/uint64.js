"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.UInt64,
    name: "int-64-unsigned",
    parse(reader, descriptor) {
        return reader.readUInt64();
    },
    write(writer, descriptor, value) {
        writer.writeUInt64(value);
    }
};
//# sourceMappingURL=uint64.js.map