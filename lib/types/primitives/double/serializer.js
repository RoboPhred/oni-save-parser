"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.DoubleTypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Double, "double", reader => reader.readDouble(), (writer, value) => writer.writeDouble(value));
//# sourceMappingURL=serializer.js.map