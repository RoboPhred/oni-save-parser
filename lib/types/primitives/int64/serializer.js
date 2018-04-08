"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.Int64TypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Int64, "int-64", reader => reader.readInt64(), (writer, value) => writer.writeInt64(value));
//# sourceMappingURL=serializer.js.map