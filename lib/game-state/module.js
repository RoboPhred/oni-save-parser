"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const game_state_1 = require("./game-state");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(game_state_1.OniGameStateImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map