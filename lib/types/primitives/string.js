"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.String,
    name: "string",
    parse(reader, descriptor) {
        return reader.readKleiString();
    },
    write(writer, descriptor, value) {
        writer.writeKleiString(value);
    }
};
//# sourceMappingURL=string.js.map