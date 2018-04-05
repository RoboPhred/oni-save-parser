"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const logger_1 = require("./logger");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(logger_1.LoggerImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map