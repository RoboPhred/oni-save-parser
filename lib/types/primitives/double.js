"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Double,
    name: "double",
    parse(reader, descriptor) {
        return reader.readDouble();
    },
    write(writer, descriptor, value) {
        writer.writeDouble(value);
    }
};
//# sourceMappingURL=double.js.map