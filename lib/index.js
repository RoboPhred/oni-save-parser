"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("./binary-serializer");
const parser_1 = require("./parser");
const header_1 = require("./save-parser/header");
const templates_1 = require("./save-parser/templates");
function parseSaveGame(data) {
    const reader = new binary_serializer_1.ArrayDataReader(data);
    const header = parser_1.parse(reader, header_1.parseHeader());
    const templates = templates_1.parseTemplates(reader);
    return {
        header,
        templates
    };
}
exports.parseSaveGame = parseSaveGame;
function writeSaveGame(save) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    header_1.writeHeader(writer, save.header);
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=index.js.map