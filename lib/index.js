"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("./binary-serializer");
const parser_1 = require("./parser");
const parser_2 = require("./save-structure/parser");
__export(require("./save-structure"));
function parseSaveGame(data) {
    let reader = new binary_serializer_1.ArrayDataReader(data);
    const saveGame = parser_1.parse(reader, parser_2.parseSaveGame());
    return saveGame;
}
exports.parseSaveGame = parseSaveGame;
function writeSaveGame(save) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    parser_1.unparse(writer, parser_2.unparseSaveGame(save));
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=index.js.map