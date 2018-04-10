"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.UInt16TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.UInt16, "int-16-unsigned", reader => reader.readUInt16(), (writer, value) => writer.writeUInt16(value));
//# sourceMappingURL=serializer.js.map