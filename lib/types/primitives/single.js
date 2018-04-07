"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Int16,
    name: "single",
    parse(reader, descriptor) {
        return reader.readSingle();
    },
    write(writer, descriptor, value) {
        writer.writeSingle(value);
    }
};
//# sourceMappingURL=single.js.map