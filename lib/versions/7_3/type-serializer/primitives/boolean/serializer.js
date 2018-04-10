"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.BooleanTypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Boolean, "boolean", reader => reader.readByte() == 1, (writer, value) => writer.writeByte(value ? 1 : 0));
//# sourceMappingURL=serializer.js.map