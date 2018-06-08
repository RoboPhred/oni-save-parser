"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const binary_serializer_1 = require("../../binary-serializer");
const services_1 = require("./services");
const module_1 = require("./module");
let containerModule = null;
function parseSaveGame(data, injectModule) {
    const container = new microinject_1.Container();
    if (!containerModule) {
        containerModule = module_1.createModule();
    }
    const useModule = injectModule
        ? microinject_1.composeModules(containerModule, injectModule)
        : containerModule;
    container.load(useModule);
    const save = container.get(services_1.SaveGameInstance);
    const reader = new binary_serializer_1.ArrayDataReader(data);
    save.parse(reader);
    return save.toJSON();
}
exports.parseSaveGame = parseSaveGame;
function writeSaveGame(save, injectModule) {
    const container = new microinject_1.Container();
    if (!containerModule) {
        containerModule = module_1.createModule();
    }
    const useModule = injectModule
        ? microinject_1.composeModules(containerModule, injectModule)
        : containerModule;
    container.load(useModule);
    const saveInstance = container.get(services_1.SaveGameInstance);
    const writer = new binary_serializer_1.ArrayDataWriter();
    saveInstance.fromJSON(save);
    saveInstance.write(writer);
    return writer.getBytes();
}
exports.writeSaveGame = writeSaveGame;
//# sourceMappingURL=serializer.js.map