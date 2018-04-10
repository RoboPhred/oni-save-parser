"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const binary_serializer_1 = require("../../binary-serializer");
const services_1 = require("./services");
const module_1 = require("./module");
let containerModule = null;
// TODO: return SaveGame, not SaveGameInstance.
function parseSaveGame(data) {
    const container = new microinject_1.Container();
    if (!containerModule) {
        containerModule = module_1.createModule();
    }
    container.load(containerModule);
    const save = container.get(services_1.SaveGameInstance);
    const reader = new binary_serializer_1.ArrayDataReader(data);
    save.parse(reader);
    return save;
}
exports.parseSaveGame = parseSaveGame;
// TODO: accept SaveGame, not SaveGameInstance.
function writeSaveGame(save) {
    const writer = new binary_serializer_1.ArrayDataWriter();
    save.write(writer);
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=serializer.js.map