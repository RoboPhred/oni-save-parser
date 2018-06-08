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
const utils_1 = require("../../../utils");
const type_serializer_1 = require("../type-serializer");
const services_1 = require("../services");
const AssemblyTypeName = "Game+Settings";
let GameSettingsInstanceImpl = class GameSettingsInstanceImpl {
    constructor(_templateSerializer) {
        this._templateSerializer = _templateSerializer;
        this._data = null;
    }
    get baseAlreadyCreated() {
        return utils_1.ensureNotNull(this._data, "The value has not yet been parsed.")
            .baseAlreadyCreated;
    }
    get nextUniqueID() {
        return utils_1.ensureNotNull(this._data, "The value has not yet been parsed.")
            .nextUniqueID;
    }
    get gameID() {
        return utils_1.ensureNotNull(this._data, "The value has not yet been parsed.")
            .gameID;
    }
    parse(reader) {
        const rootName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== AssemblyTypeName) {
            throw new Error(`Failed to parse GameSettings: Expected to find "${AssemblyTypeName}", but got "${rootName}".`);
        }
        this._data = this._templateSerializer.parseTemplatedType(reader, AssemblyTypeName);
    }
    write(writer) {
        if (!this._data) {
            throw new Error("Failed to write GameSettings: Data has not been set.");
        }
        writer.writeKleiString(AssemblyTypeName);
        this._templateSerializer.writeTemplatedType(writer, AssemblyTypeName, this._data);
    }
    fromJSON(value) {
        // TODO: validate json value
        this._data = Object.assign({}, value);
    }
    toJSON() {
        if (!this._data) {
            throw new Error("Failed to serialize GameSettings json: Data has not been set.");
        }
        return Object.assign({}, this._data);
    }
};
GameSettingsInstanceImpl = __decorate([
    microinject_1.injectable(services_1.GameSettingsInstance),
    microinject_1.inScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(type_serializer_1.TypeTemplateSerializer))
], GameSettingsInstanceImpl);
exports.GameSettingsInstanceImpl = GameSettingsInstanceImpl;
//# sourceMappingURL=game-settings.js.map