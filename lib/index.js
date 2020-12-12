"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSaveGame = exports.parseSaveGame = void 0;
const binary_serializer_1 = require("./binary-serializer");
const parser_1 = require("./parser");
const parser_2 = require("./save-structure/parser");
__exportStar(require("./save-structure"), exports);
__exportStar(require("./save-structure/data-types"), exports);
__exportStar(require("./binary-serializer/types"), exports);
var progress_1 = require("./progress");
Object.defineProperty(exports, "progressReporter", { enumerable: true, get: function () { return progress_1.progressReporter; } });
var tagger_1 = require("./tagger");
Object.defineProperty(exports, "tagReporter", { enumerable: true, get: function () { return tagger_1.tagReporter; } });
var version_validator_1 = require("./save-structure/version-validator");
Object.defineProperty(exports, "E_VERSION_MAJOR", { enumerable: true, get: function () { return version_validator_1.E_VERSION_MAJOR; } });
Object.defineProperty(exports, "E_VERSION_MINOR", { enumerable: true, get: function () { return version_validator_1.E_VERSION_MINOR; } });
function parseSaveGame(data, opts) {
    let interceptor = undefined;
    let parserOptions = {};
    if (typeof opts === "function") {
        interceptor = opts;
    }
    else if (opts != null) {
        parserOptions = opts;
        interceptor = opts.interceptor;
    }
    let reader = new binary_serializer_1.ArrayDataReader(data);
    const saveGame = parser_1.parse(reader, parser_2.parseSaveGame(parserOptions), interceptor);
    return saveGame;
}
exports.parseSaveGame = parseSaveGame;
function writeSaveGame(save, interceptor) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    parser_1.unparse(writer, parser_2.unparseSaveGame(save), interceptor);
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=index.js.map