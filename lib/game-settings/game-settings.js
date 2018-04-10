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
const GameSettings = "Game+Settings";
let OniGameSettingsImpl = class OniGameSettingsImpl {
    constructor(_typeSerializer) {
        this._typeSerializer = _typeSerializer;
        this._settings = null;
    }
    get baseAlreadyCreated() {
        return utils_1.ensureNotNull(this._settings, "The value has not yet been parsed.").baseAlreadyCreated;
    }
    get nextUniqueID() {
        return utils_1.ensureNotNull(this._settings, "The value has not yet been parsed.").nextUniqueID;
    }
    get gameID() {
        return utils_1.ensureNotNull(this._settings, "The value has not yet been parsed.").gameID;
    }
    parse(reader) {
        const rootName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== GameSettings) {
            throw new Error(`Expected to find "${GameSettings}", but got "${rootName}"`);
        }
        this._settings = this._typeSerializer.parseTemplatedType(reader, GameSettings);
    }
    write(writer) {
        if (!this._settings) {
            throw new Error("Failed to write GameSettings: No game settings loaded.");
        }
        writer.writeKleiString(GameSettings);
        this._typeSerializer.writeTemplatedType(writer, GameSettings, this._settings);
    }
    toJSON() {
        return {
            baseAlreadyCreated: this.baseAlreadyCreated,
            nextUniqueID: this.nextUniqueID,
            gameID: this.gameID
        };
    }
};
OniGameSettingsImpl = __decorate([
    microinject_1.injectable(services_1.OniGameSettings),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(type_serializer_1.TypeSerializer))
], OniGameSettingsImpl);
exports.OniGameSettingsImpl = OniGameSettingsImpl;
//# sourceMappingURL=game-settings.js.map