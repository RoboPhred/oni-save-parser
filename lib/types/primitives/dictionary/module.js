"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const serializer_1 = require("./serializer");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(serializer_1.DictionaryTypeSerializer);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map