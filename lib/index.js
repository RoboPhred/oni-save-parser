"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("./binary-serializer");
const parser_1 = require("./parser");
const header_1 = require("./save-parser/header");
const index_1 = require("./save-parser/templates/index");
const templates_1 = require("./save-parser/templates");
const world_1 = require("./save-parser/world");
const save_settings_1 = require("./save-parser/save-settings");
const game_objects_1 = require("./save-parser/game-objects");
const save_game_data_1 = require("./save-parser/save-game-data");
__export(require("./save-structure"));
__export(require("./data-types"));
const SAVE_HEADER = "KSAV";
const CURRENT_VERSION_MAJOR = 7;
const CURRENT_VERSION_MINOR = 4;
function parseSaveGame(data) {
    let reader = new binary_serializer_1.ArrayDataReader(data);
    const header = parser_1.parse(reader, header_1.parseHeader());
    const { saveMajorVersion, saveMinorVersion } = header.gameInfo;
    if (saveMajorVersion !== CURRENT_VERSION_MAJOR ||
        saveMinorVersion !== CURRENT_VERSION_MINOR) {
        throw new Error(`Save version "${saveMajorVersion}.${saveMinorVersion}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`);
    }
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
        throw new Error(`Save version "${versionMajor}.${versionMinor}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`);
    }
    const gameObjects = parser_1.parse(reader, game_objects_1.parseGameObjects(context));
    const gameData = parser_1.parse(reader, save_game_data_1.parseGameData(context));
    return {
        header,
        templates,
        world,
        settings,
        version: {
            major: versionMajor,
            minor: versionMinor
        },
        gameObjects,
        gameData
    };
}
exports.parseSaveGame = parseSaveGame;
function writeSaveGame(save) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    parser_1.unparse(writer, header_1.unparseHeader(save.header));
    parser_1.unparse(writer, index_1.unparseTemplates(save.templates));
    if (save.header.isCompressed) {
        const deflateWriter = new binary_serializer_1.ZlibDataWriter();
        writeCompressedData(save, deflateWriter);
        writer.writeBytes(deflateWriter.getBytesView());
    }
    else {
        writeCompressedData(save, writer);
    }
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
function writeCompressedData(save, writer) {
    const context = makeSaveWriterContext(save.header, save.templates);
    writer.writeKleiString("world");
    parser_1.unparse(writer, world_1.writeWorld(save.world, context));
    parser_1.unparse(writer, save_settings_1.writeSaveSettings(save.settings, context));
    writer.writeChars(SAVE_HEADER);
    writer.writeInt32(save.version.major);
    writer.writeInt32(save.version.minor);
    parser_1.unparse(writer, game_objects_1.unparseGameObjects(save.gameObjects, context));
    parser_1.unparse(writer, save_game_data_1.writeGameData(save.gameData, context));
}
function makeSaveParserContext(header, templates) {
    return Object.assign({}, header, { parseByTemplate: templates_1.parseByTemplate.bind(null, templates) });
}
function makeSaveWriterContext(header, templates) {
    return Object.assign({}, header, { unparseByTemplate: templates_1.unparseByTemplate.bind(null, templates) });
}
//# sourceMappingURL=index.js.map