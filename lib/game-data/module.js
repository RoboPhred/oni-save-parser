"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const game_data_1 = require("./game-data");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(game_data_1.OniGameDataImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map