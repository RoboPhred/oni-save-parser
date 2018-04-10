"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.Int32TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Int32, "int-32", reader => reader.readInt32(), (writer, value) => writer.writeInt32(value));
//# sourceMappingURL=serializer.js.map