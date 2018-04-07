"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Enumeration,
    name: "enumeration",
    parse(reader, descriptor) {
        return reader.readUInt32();
    },
    write(writer, descriptor, value) {
        writer.writeUInt32(value);
    }
};
//# sourceMappingURL=enumeration.js.map