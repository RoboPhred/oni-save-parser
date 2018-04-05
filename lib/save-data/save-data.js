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
const type_templates_1 = require("../type-templates");
const save_header_1 = require("../save-header");
const game_state_1 = require("../game-state");
const services_1 = require("./services");
let OniSaveDataImpl = class OniSaveDataImpl {
    constructor(header, templates, gameState) {
        this.header = header;
        this.templates = templates;
        this.gameState = gameState;
    }
    parse(reader) {
        this.header.parse(reader);
        this.templates.parse(reader);
        this.gameState.parse(reader);
    }
    toJSON() {
        return {
            header: this.header
        };
    }
};
OniSaveDataImpl = __decorate([
    microinject_1.injectable(services_1.OniSaveData),
    microinject_1.asScope(services_1.OniSaveData),
    __param(0, microinject_1.inject(save_header_1.OniSaveHeader)),
    __param(1, microinject_1.inject(type_templates_1.TypeTemplateRegistry)),
    __param(2, microinject_1.inject(game_state_1.OniGameState))
], OniSaveDataImpl);
exports.OniSaveDataImpl = OniSaveDataImpl;
//# sourceMappingURL=save-data.js.map