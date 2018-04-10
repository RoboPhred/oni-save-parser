"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const serializer_1 = require("./generic/serializer");
const serializer_2 = require("./nongeneric/serializer");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(serializer_1.UserDefinedGenericTypeSerializer);
        bind(serializer_2.UserDefinedTypeSerializer);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map