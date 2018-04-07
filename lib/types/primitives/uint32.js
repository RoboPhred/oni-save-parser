"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.UInt32,
    name: "int-32-unsigned",
    parse(reader, descriptor) {
        return reader.readUInt32();
    },
    write(writer, descriptor, value) {
        writer.writeUInt32(value);
    }
};
//# sourceMappingURL=uint32.js.map