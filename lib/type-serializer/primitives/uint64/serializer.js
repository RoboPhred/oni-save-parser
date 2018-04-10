"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.UInt64TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.UInt64, "int-64-unsigned", reader => reader.readUInt64(), (writer, value) => writer.writeUInt64(value));
//# sourceMappingURL=serializer.js.map