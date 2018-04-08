"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../../interfaces");
const simple_serializer_1 = require("../simple-serializer");
exports.SingleTypeSerializer = simple_serializer_1.createSimpleSerializationInfo(interfaces_1.TypeID.Single, "single", reader => reader.readSingle(), (writer, value) => writer.writeSingle(value));
//# sourceMappingURL=serializer.js.map