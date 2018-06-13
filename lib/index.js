"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("./binary-serializer");
const parser_1 = require("./parser");
const header_1 = require("./save-parser/header");
const index_1 = require("./save-parser/templates/index");
const type_parser_1 = require("./save-parser/templates/type-parser");
const world_1 = require("./save-parser/world");
function parseSaveGame(data) {
    let reader = new binary_serializer_1.ArrayDataReader(data);
    const header = parser_1.parse(reader, header_1.parseHeader());
    const templates = parser_1.parse(reader, index_1.parseTemplates());
    if (header.isCompressed) {
        reader = new binary_serializer_1.ZlibDataReader(reader.viewAllBytes());
    }
    const context = makeSaveParserContext(header, templates);
    const worldMarker = reader.readKleiString();
    if (worldMarker !== "world") {
        throw new Error(`Expected "world" string.`);
    }
    const world = parser_1.parse(reader, world_1.parseWorld(context));
    return {
        header,
        templates,
        world
    };
}
exports.parseSaveGame = parseSaveGame;
function makeSaveParserContext(header, templates) {
    return Object.assign({}, header, { parseByTemplate: type_parser_1.parseByTemplate.bind(null, templates) });
}
function writeSaveGame(save) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    header_1.writeHeader(writer, save.header);
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=index.js.map