"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Int64,
    name: "int-64",
    parse(reader, descriptor) {
        return reader.readInt64();
    },
    write(writer, descriptor, value) {
        writer.writeInt64(value);
    }
};
//# sourceMappingURL=int64.js.map