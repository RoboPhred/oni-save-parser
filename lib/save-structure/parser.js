"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("../binary-serializer");
const parser_1 = require("../parser");
const parser_2 = require("./header/parser");
const template_parser_1 = require("./type-templates/template-parser");
const template_data_parser_1 = require("./type-templates/template-data-parser");
const parser_3 = require("./world/parser");
const parser_4 = require("./settings/parser");
const parser_5 = require("./game-objects/parser");
const parser_6 = require("./game-data/parser");
const SAVE_HEADER = "KSAV";
const CURRENT_VERSION_MAJOR = 7;
const CURRENT_VERSION_MINOR = 4;
function* parseSaveGame() {
    const header = yield* parser_2.parseHeader();
    const { saveMajorVersion, saveMinorVersion } = header.gameInfo;
    if (saveMajorVersion !== CURRENT_VERSION_MAJOR ||
        saveMinorVersion !== CURRENT_VERSION_MINOR) {
        throw new Error(`Save version "${saveMajorVersion}.${saveMinorVersion}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`);
    }
    const templates = yield* template_parser_1.parseTemplates();
    // TODO: Implement compression support at parser level; do not
    //  break the parse iterator chain with child parse calls.
    let reader;
    if (header.isCompressed) {
        reader = new binary_serializer_1.ZlibDataReader(yield parser_1.readBytes());
    }
    else {
        reader = new binary_serializer_1.ArrayDataReader(yield parser_1.readBytes());
    }
    const context = makeSaveParserContext(header, templates);
    const worldMarker = reader.readKleiString();
    if (worldMarker !== "world") {
        throw new Error(`Expected "world" string.`);
    }
    const world = parser_1.parse(reader, parser_3.parseWorld(context));
    const settings = parser_1.parse(reader, parser_4.parseSettings(context));
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
    const gameObjects = parser_1.parse(reader, parser_5.parseGameObjects(context));
    const gameData = parser_1.parse(reader, parser_6.parseGameData(context));
    const saveGame = {
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
    return saveGame;
}
exports.parseSaveGame = parseSaveGame;
function makeSaveParserContext(header, templates) {
    return Object.assign({}, header, { parseByTemplate: template_data_parser_1.parseByTemplate.bind(null, templates) });
}
function* unparseSaveGame(saveGame) {
    yield* parser_2.unparseHeader(saveGame.header);
    yield* template_parser_1.unparseTemplates(saveGame.templates);
    // TODO: Implement compression support at parser level; do not
    //  break the parse iterator chain with child parse calls.
    const writer = saveGame.header.isCompressed
        ? new binary_serializer_1.ZlibDataWriter()
        : new binary_serializer_1.ArrayDataWriter();
    writeCompressedData(saveGame, writer);
    yield parser_1.writeBytes(writer.getBytes());
}
exports.unparseSaveGame = unparseSaveGame;
function writeCompressedData(save, writer) {
    const context = makeSaveWriterContext(save.header, save.templates);
    writer.writeKleiString("world");
    parser_1.unparse(writer, parser_3.unparseWorld(save.world, context));
    parser_1.unparse(writer, parser_4.unparseSettings(save.settings, context));
    writer.writeChars(SAVE_HEADER);
    writer.writeInt32(save.version.major);
    writer.writeInt32(save.version.minor);
    parser_1.unparse(writer, parser_5.unparseGameObjects(save.gameObjects, context));
    parser_1.unparse(writer, parser_6.writeGameData(save.gameData, context));
}
function makeSaveWriterContext(header, templates) {
    return Object.assign({}, header, { unparseByTemplate: template_data_parser_1.unparseByTemplate.bind(null, templates) });
}
//# sourceMappingURL=parser.js.map