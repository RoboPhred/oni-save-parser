"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const save_data_1 = require("./save-data");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(save_data_1.OniSaveDataImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map