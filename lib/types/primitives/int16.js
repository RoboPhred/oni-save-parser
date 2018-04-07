"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Int16,
    name: "int-16",
    parse(reader, descriptor) {
        return reader.readInt16();
    },
    write(writer, descriptor, value) {
        writer.writeInt16(value);
    }
};
//# sourceMappingURL=int16.js.map