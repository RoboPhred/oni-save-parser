"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("./binary-serializer");
const parse_header_1 = require("./parser/parse-header");
function parseSaveGame(data) {
    const reader = new binary_serializer_1.ArrayDataReader(data);
    const header = parse_header_1.parseHeader(reader);
    return {
        header
    };
}
exports.parseSaveGame = parseSaveGame;
function writeSaveGame(save) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    parse_header_1.writeHeader(writer, save.header);
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=index.js.map