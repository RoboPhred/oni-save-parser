"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const save_body_1 = require("./save-body");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(save_body_1.OniSaveBodyImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map