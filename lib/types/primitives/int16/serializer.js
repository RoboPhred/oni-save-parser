"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.Int16TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Int16, "int-16", reader => reader.readInt16(), (writer, value) => writer.writeInt16(value));
//# sourceMappingURL=serializer.js.map