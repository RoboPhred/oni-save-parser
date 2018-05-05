"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const step_executor_1 = require("./step-executor");
function createModule() {
    return new microinject_1.ContainerModule(bind => {
        bind(step_executor_1.ParseStepExecutorImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map