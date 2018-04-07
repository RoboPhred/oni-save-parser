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
const oni_save_1 = require("../oni-save");
const services_1 = require("./services");
let OniGameDataImpl = class OniGameDataImpl {
    constructor(_typeReader, _typeWriter) {
        this._typeReader = _typeReader;
        this._typeWriter = _typeWriter;
        this._data = null;
    }
    parse(reader) {
        this._data = this._typeReader.deserialize(reader, "Game+GameSaveData");
    }
    write(writer) {
        this._typeWriter.serialize(writer, "Game+GameSaveData", this._data);
    }
    toJSON() {
        // TODO
        return Object.assign({}, this._data);
    }
};
OniGameDataImpl = __decorate([
    microinject_1.injectable(services_1.OniGameData),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(type_templates_1.TypeReader)),
    __param(1, microinject_1.inject(type_templates_1.TypeWriter))
], OniGameDataImpl);
exports.OniGameDataImpl = OniGameDataImpl;
//# sourceMappingURL=game-data.js.map