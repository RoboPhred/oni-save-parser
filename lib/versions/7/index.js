"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const binary_serializer_1 = require("../../binary-serializer");
const oni_save_1 = require("../../oni-save");
const module_1 = __importDefault(require("./module"));
function parseOniSave(data) {
    const container = new microinject_1.Container();
    container.load(module_1.default);
    const save = container.get(oni_save_1.OniSave);
    const reader = new binary_serializer_1.ArrayDataReader(data);
    save.parse(reader);
    return save;
}
exports.parseOniSave = parseOniSave;
//# sourceMappingURL=index.js.map