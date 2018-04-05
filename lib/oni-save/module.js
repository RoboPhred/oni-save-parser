"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const save_1 = require("./save");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(save_1.OniSaveImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map