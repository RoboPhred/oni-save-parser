"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseSaveGame = exports.parseSaveGame = void 0;
const parser_1 = require("../parser");
const parser_2 = require("./header/parser");
const template_parser_1 = require("./type-templates/template-parser");
const template_data_parser_1 = require("./type-templates/template-data-parser");
const parser_3 = require("./world/parser");
const parser_4 = require("./settings/parser");
const parser_5 = require("./game-objects/parser");
const parser_6 = require("./game-data/parser");
const version_validator_1 = require("./version-validator");
const SAVE_HEADER = "KSAV";
function* parseSaveGame(options = {}) {
    const header = yield* parser_2.parseHeader();
    const { saveMajorVersion, saveMinorVersion } = header.gameInfo;
    const versionStrictness = options.versionStrictness || "minor";
    if (versionStrictness !== "none") {
        version_validator_1.validateVersion(saveMajorVersion, saveMinorVersion, versionStrictness);
    }
    const templates = yield* template_parser_1.parseTemplates();
    const context = makeSaveParserContext(header, templates);
    let body;
    if (header.isCompressed) {
        body = yield parser_1.readCompressed(parseSaveBody(context));
    }
    else {
        body = yield* parseSaveBody(context);
    }
    const saveGame = Object.assign({ header,
        templates }, body);
    return saveGame;
}
exports.parseSaveGame = parseSaveGame;
function* parseSaveBody(context) {
    const worldMarker = yield parser_1.readKleiString();
    if (worldMarker !== "world") {
        throw new Error(`Expected "world" string.`);
    }
    const world = yield* parser_3.parseWorld(context);
    const settings = yield* parser_4.parseSettings(context);
    const simDataLength = yield parser_1.readInt32();
    const simData = yield parser_1.readBytes(simDataLength);
    const ksav = yield parser_1.readChars(SAVE_HEADER.length);
    if (ksav !== SAVE_HEADER) {
        throw new Error(`Failed to parse ksav header: Expected "${SAVE_HEADER}" but got "${ksav}" (${Array.from(ksav).map((x) => x.charCodeAt(0))})`);
    }
    const versionMajor = yield parser_1.readInt32();
    const versionMinor = yield parser_1.readInt32();
    version_validator_1.validateVersion(versionMajor, versionMinor);
    const gameObjects = yield* parser_5.parseGameObjects(context);
    const gameData = yield* parser_6.parseGameData(context);
    const body = {
        world,
        settings,
        simData,
        version: {
            major: versionMajor,
            minor: versionMinor,
        },
        gameObjects,
        gameData,
    };
    return body;
}
function makeSaveParserContext(header, templates) {
    return Object.assign(Object.assign({}, header), { parseByTemplate: (templateName) => template_data_parser_1.parseByTemplate(templates, templateName) });
}
function* unparseSaveGame(saveGame) {
    yield* parser_2.unparseHeader(saveGame.header);
    yield* template_parser_1.unparseTemplates(saveGame.templates);
    const context = makeSaveWriterContext(saveGame.header, saveGame.templates);
    if (saveGame.header.isCompressed) {
        yield parser_1.writeCompressed(unparseSaveBody(saveGame, context));
    }
    else {
        yield* unparseSaveBody(saveGame, context);
    }
}
exports.unparseSaveGame = unparseSaveGame;
function* unparseSaveBody(saveGame, context) {
    yield parser_1.writeKleiString("world");
    yield* parser_3.unparseWorld(saveGame.world, context);
    yield* parser_4.unparseSettings(saveGame.settings, context);
    yield parser_1.writeInt32(saveGame.simData.byteLength);
    yield parser_1.writeBytes(saveGame.simData);
    yield parser_1.writeChars(SAVE_HEADER);
    yield parser_1.writeInt32(saveGame.version.major);
    yield parser_1.writeInt32(saveGame.version.minor);
    yield* parser_5.unparseGameObjects(saveGame.gameObjects, context);
    yield* parser_6.writeGameData(saveGame.gameData, context);
}
function makeSaveWriterContext(header, templates) {
    return Object.assign(Object.assign({}, header), { unparseByTemplate: template_data_parser_1.unparseByTemplate.bind(null, templates) });
}
//# sourceMappingURL=parser.js.map