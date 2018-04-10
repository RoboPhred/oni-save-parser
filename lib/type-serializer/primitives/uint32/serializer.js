"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.UInt32TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.UInt32, "int-32-unsigned", reader => reader.readUInt32(), (writer, value) => writer.writeUInt32(value));
//# sourceMappingURL=serializer.js.map