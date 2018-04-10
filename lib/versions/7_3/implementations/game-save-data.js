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
const AssemblyTypeName = "Game+GameSaveData";
let GameSaveDataInstanceImpl = class GameSaveDataInstanceImpl {
    constructor(_templateSerializer) {
        this._templateSerializer = _templateSerializer;
    }
    get gasConduitFlow() {
        return utils_1.ensureNotNull(this._data).gasConduitFlow;
    }
    get liquidConduitFlow() {
        return utils_1.ensureNotNull(this._data).liquidConduitFlow;
    }
    get simActiveRegionMin() {
        return utils_1.ensureNotNull(this._data).simActiveRegionMin;
    }
    get simActiveRegionMax() {
        return utils_1.ensureNotNull(this._data).simActiveRegionMax;
    }
    get fallingWater() {
        return utils_1.ensureNotNull(this._data).fallingWater;
    }
    get unstableGround() {
        return utils_1.ensureNotNull(this._data).unstableGround;
    }
    get worldDetail() {
        return utils_1.ensureNotNull(this._data).worldDetail;
    }
    get customGameSettings() {
        return utils_1.ensureNotNull(this._data).customGameSettings;
    }
    get debugWasUsed() {
        return utils_1.ensureNotNull(this._data).debugWasUsed;
    }
    get autoPrioritizeRoles() {
        return utils_1.ensureNotNull(this._data).autoPrioritizeRoles;
    }
    get advancedPersonalPriorities() {
        return utils_1.ensureNotNull(this._data).advancedPersonalPriorities;
    }
    parse(reader) {
        const typeName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        if (typeName !== AssemblyTypeName) {
            throw new Error(`Failed to parse GameSaveData: Expected to find type name "${AssemblyTypeName}", but got "${typeName}".`);
        }
        this._data = this._templateSerializer.parseTemplatedType(reader, AssemblyTypeName);
        if (!this._data) {
            throw new Error("Failed to parse GameSaveData: Parsed template type data was a null value.");
        }
    }
    write(writer) {
        if (!this._data) {
            throw new TypeError("Failed to write GameStateData: Data has not been parsed.");
        }
        writer.writeKleiString(AssemblyTypeName);
        this._templateSerializer.writeTemplatedType(writer, AssemblyTypeName, this._data);
    }
};
GameSaveDataInstanceImpl = __decorate([
    microinject_1.injectable(services_1.GameSaveDataInstance),
    microinject_1.inScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(type_serializer_1.TypeTemplateSerializer))
], GameSaveDataInstanceImpl);
exports.GameSaveDataInstanceImpl = GameSaveDataInstanceImpl;
//# sourceMappingURL=game-save-data.js.map