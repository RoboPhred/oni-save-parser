"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const services_1 = require("./services");
exports.ConsoleLoggerConfig = Symbol("ConsoleLoggerConfig");
exports.defaultConsoleLoggerConfig = {
    trace: false,
    warn: true
};
let ConsoleLoggerImpl = class ConsoleLoggerImpl {
    constructor(_config) {
        this._config = _config;
    }
    trace(str) {
        if (!this._config.trace)
            return;
        console.log(str);
    }
    warn(str) {
        if (!this._config.warn)
            return;
        console.warn(str);
    }
};
ConsoleLoggerImpl = __decorate([
    microinject_1.injectable(services_1.Logger),
    microinject_1.singleton(),
    __param(0, microinject_1.inject(exports.ConsoleLoggerConfig))
], ConsoleLoggerImpl);
exports.ConsoleLoggerImpl = ConsoleLoggerImpl;
//# sourceMappingURL=console-logger.js.map