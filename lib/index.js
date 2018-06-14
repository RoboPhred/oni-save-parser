"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("./binary-serializer");
const parser_1 = require("./parser");
const header_1 = require("./save-parser/header");
const index_1 = require("./save-parser/templates/index");
const type_parser_1 = require("./save-parser/templates/type-parser");
const world_1 = require("./save-parser/world");
const save_settings_1 = require("./save-parser/save-settings");
const game_objects_1 = require("./save-parser/game-objects");
const SAVE_HEADER = "KSAV";
const CURRENT_VERSION_MAJOR = 7;
const CURRENT_VERSION_MINOR = 3;
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
    const settings = parser_1.parse(reader, save_settings_1.parseSaveSettings(context));
    const ksav = reader.readChars(SAVE_HEADER.length);
    if (ksav !== SAVE_HEADER) {
        throw new Error(`Failed to parse ksav header: Expected "${SAVE_HEADER}" but got "${ksav}" (${Array.from(ksav).map(x => x.charCodeAt(0))})`);
    }
    const versionMajor = reader.readInt32();
    const versionMinor = reader.readInt32();
    if (versionMajor !== CURRENT_VERSION_MAJOR ||
        versionMinor !== CURRENT_VERSION_MINOR) {
        throw new Error(`Save version "${versionMajor}.${versionMinor} is not compatible with this parser.`);
    }
    const gameObjects = parser_1.parse(reader, game_objects_1.parseGameObjects(context));
    return {
        header,
        templates,
        world,
        settings,
        version: {
            major: versionMajor,
            minor: versionMinor
        },
        gameObjects
    };
}
exports.parseSaveGame = parseSaveGame;
function makeSaveParserContext(header, templates) {
    return Object.assign({}, header, { parseByTemplate: type_parser_1.parseByTemplate.bind(null, templates) });
}
function writeSaveGame(save) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    parser_1.write(writer, header_1.writeHeader(save.header));
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=index.js.map