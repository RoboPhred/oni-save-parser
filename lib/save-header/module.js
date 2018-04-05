"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const header_1 = require("./header");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(header_1.OniSaveHeaderImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map