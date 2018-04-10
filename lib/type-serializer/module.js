"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = require("./primitives/module");
const module_2 = require("./user-defined/module");
const type_serializer_1 = require("./type-serializer");
const template_registry_1 = require("./template-registry");
function createModule() {
    return microinject_1.composeModules(module_1.createModule(), module_2.createModule(), new microinject_1.ContainerModule(bind => {
        bind(type_serializer_1.TypeSerializerImpl);
        bind(template_registry_1.TypeTemplateRegistryImpl);
    }));
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map