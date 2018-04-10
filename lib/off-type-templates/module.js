"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const template_registry_1 = require("./template-registry");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(template_registry_1.TypeTemplateRegistryImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map