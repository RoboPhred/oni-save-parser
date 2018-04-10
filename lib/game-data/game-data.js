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
const utils_1 = require("../utils");
const type_serializer_1 = require("../type-serializer");
const oni_save_1 = require("../oni-save");
const services_1 = require("./services");
const GameStateData = "Game+GameSaveData";
let OniGameDataImpl = class OniGameDataImpl {
    constructor(_templateSerializer) {
        this._templateSerializer = _templateSerializer;
        this._data = null;
    }
    parse(reader) {
        const rootName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== GameStateData) {
            throw new Error(`Expected to find "${GameStateData}", but got "${rootName}".`);
        }
        this._data = this._templateSerializer.parseTemplatedType(reader, GameStateData);
    }
    write(writer) {
        if (!this._data) {
            throw new Error("Failed to write GameStateData: No data loaded.");
        }
        writer.writeKleiString(GameStateData);
        this._templateSerializer.writeTemplatedType(writer, GameStateData, this._data);
    }
    toJSON() {
        // TODO
        return Object.assign({}, this._data);
    }
};
OniGameDataImpl = __decorate([
    microinject_1.injectable(services_1.OniGameData),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(type_serializer_1.TypeTemplateSerializer))
], OniGameDataImpl);
exports.OniGameDataImpl = OniGameDataImpl;
//# sourceMappingURL=game-data.js.map