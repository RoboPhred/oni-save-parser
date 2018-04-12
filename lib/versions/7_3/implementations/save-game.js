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
const type_serializer_1 = require("../type-serializer");
const services_1 = require("../services");
let SaveGameInstanceImpl = class SaveGameInstanceImpl {
    constructor(_header, _templates, _body) {
        this._header = _header;
        this._templates = _templates;
        this._body = _body;
    }
    get header() {
        return this._header;
    }
    get templates() {
        return this._templates.toJSON();
    }
    get body() {
        return this._body;
    }
    parse(reader) {
        this._header.parse(reader);
        this._templates.parse(reader);
        this._body.parse(reader);
    }
    write(writer) {
        this._header.write(writer);
        this._templates.write(writer);
        this._body.write(writer);
    }
    fromJSON(value) {
        this._header.fromJSON(value.header),
            this._templates.fromJSON(value.templates);
        this._body.fromJSON(value.body);
    }
    toJSON() {
        return {
            header: this._header.toJSON(),
            templates: this._templates.toJSON(),
            body: this._body.toJSON()
        };
    }
};
SaveGameInstanceImpl = __decorate([
    microinject_1.injectable(services_1.SaveGameInstance),
    microinject_1.asScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(services_1.SaveGameHeaderInstance)),
    __param(1, microinject_1.inject(type_serializer_1.TypeTemplateRegistry)),
    __param(2, microinject_1.inject(services_1.SaveBodyInstance))
], SaveGameInstanceImpl);
exports.SaveGameInstanceImpl = SaveGameInstanceImpl;
//# sourceMappingURL=save-game.js.map