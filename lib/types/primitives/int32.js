"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Int32,
    name: "int-32",
    parse(reader, descriptor) {
        return reader.readInt32();
    },
    write(writer, descriptor, value) {
        writer.writeInt32(value);
    }
};
//# sourceMappingURL=int32.js.map