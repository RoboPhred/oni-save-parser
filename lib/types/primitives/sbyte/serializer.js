"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.SByteTypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.SByte, "byte-signed", reader => reader.readSByte(), (writer, value) => writer.writeSByte(value));
//# sourceMappingURL=serializer.js.map