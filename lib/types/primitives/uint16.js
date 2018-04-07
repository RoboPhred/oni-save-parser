"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.UInt16,
    name: "int-16-unsigned",
    parse(reader, descriptor) {
        return reader.readUInt16();
    },
    write(writer, descriptor, value) {
        writer.writeUInt16(value);
    }
};
//# sourceMappingURL=uint16.js.map