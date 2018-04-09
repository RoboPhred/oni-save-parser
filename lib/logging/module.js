"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const console_logger_1 = require("./console-logger");
function createModule(config) {
    return new microinject_1.ContainerModule(bind => {
        bind(console_logger_1.ConsoleLoggerConfig).toConstantValue(Object.assign({}, console_logger_1.defaultConsoleLoggerConfig, (config || {})));
        bind(console_logger_1.ConsoleLoggerImpl);
    });
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map