"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = require("../../parse-steps/module");
const module_2 = require("./type-serializer/module");
const game_object_manager_1 = require("./implementations/game-object-manager");
const game_save_data_1 = require("./implementations/game-save-data");
const game_save_root_1 = require("./implementations/game-save-root");
const game_settings_1 = require("./implementations/game-settings");
const save_body_1 = require("./implementations/save-body");
const save_game_header_1 = require("./implementations/save-game-header");
const save_game_1 = require("./implementations/save-game");
function createModule() {
    return microinject_1.composeModules(module_1.createModule(), module_2.createModule(), new microinject_1.ContainerModule(bind => {
        bind(game_object_manager_1.GameObjectManagerImpl);
        bind(game_save_data_1.GameSaveDataInstanceImpl);
        bind(game_save_root_1.GameSaveRootInstanceImpl);
        bind(game_settings_1.GameSettingsInstanceImpl);
        bind(save_body_1.SaveBodyInstanceImpl);
        bind(save_game_header_1.SaveGameHeaderInstanceImpl);
        bind(save_game_1.SaveGameInstanceImpl);
    }));
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map