"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const save_root_1 = require("./save-root");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(save_root_1.OniSaveRootImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map