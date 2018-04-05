"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const game_settings_1 = require("./game-settings");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(game_settings_1.OniGameSettingsImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map