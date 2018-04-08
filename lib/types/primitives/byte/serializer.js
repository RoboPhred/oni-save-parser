"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.ByteTypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Byte, "byte", reader => reader.readByte(), (writer, value) => writer.writeByte(value));
//# sourceMappingURL=serializer.js.map