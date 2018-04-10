"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.StringTypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.String, "string", reader => reader.readKleiString(), (writer, value) => writer.writeKleiString(value));
//# sourceMappingURL=serializer.js.map