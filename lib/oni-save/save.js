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
const save_body_1 = require("../save-body");
const services_1 = require("./services");
let OniSaveImpl = class OniSaveImpl {
    constructor(header, _templates, body) {
        this.header = header;
        this._templates = _templates;
        this.body = body;
    }
    parse(reader) {
        this.header.parse(reader);
        this._templates.parse(reader);
        this.body.parse(reader);
    }
    toJSON() {
        return {
            header: this.header.toJSON(),
            body: this.body.toJSON()
        };
    }
};
OniSaveImpl = __decorate([
    microinject_1.injectable(services_1.OniSave),
    microinject_1.asScope(services_1.OniSave),
    __param(0, microinject_1.inject(save_header_1.OniSaveHeader)),
    __param(1, microinject_1.inject(type_templates_1.TypeTemplateRegistry)),
    __param(2, microinject_1.inject(save_body_1.OniSaveBody))
], OniSaveImpl);
exports.OniSaveImpl = OniSaveImpl;
//# sourceMappingURL=save.js.map