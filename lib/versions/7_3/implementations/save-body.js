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
const binary_serializer_1 = require("../../../binary-serializer");
const utils_1 = require("../../../utils");
const services_1 = require("../services");
let SaveBodyInstanceImpl = class SaveBodyInstanceImpl {
    constructor(_header, _saveRoot, _gameSettings, _gameObjectManager, _gameData) {
        this._header = _header;
        this._saveRoot = _saveRoot;
        this._gameSettings = _gameSettings;
        this._gameObjectManager = _gameObjectManager;
        this._gameData = _gameData;
    }
    get saveRoot() {
        return utils_1.ensureNotNull(this._saveRoot);
    }
    get gameSettings() {
        return utils_1.ensureNotNull(this._gameSettings);
    }
    get gameObjects() {
        return utils_1.ensureNotNull(this._gameObjectManager).gameObjects;
    }
    get gameData() {
        return utils_1.ensureNotNull(this._gameData);
    }
    parse(reader) {
        if (this._header.isCompressed) {
            const deflatedReader = new binary_serializer_1.ZlibDataReader(reader.viewAllBytes());
            this._parseState(deflatedReader);
        }
        else {
            this._parseState(reader);
        }
    }
    write(writer) {
        if (this._header.isCompressed) {
            const deflateWriter = new binary_serializer_1.ZlibDataWriter();
            this._writeState(deflateWriter);
            writer.writeBytes(deflateWriter.getBytesView());
        }
        else {
            this._writeState(writer);
        }
    }
    _parseState(reader) {
        // Here begins our equivalent of the ONI SaveLoader.Load(IReader reader)
        // ONI does nothing aside from read this into the ether.
        //  We will check it to ensure our data still looks good up
        //  to this point.
        const worldString = reader.readKleiString();
        if (worldString !== "world") {
            throw new Error(`Failed to parse SaveBody: Expected "world" prefix.`);
        }
        this._saveRoot.parse(reader);
        this._gameSettings.parse(reader);
        this._gameObjectManager.parse(reader);
        this._gameData.parse(reader);
    }
    _writeState(writer) {
        writer.writeKleiString("world");
        this._saveRoot.write(writer);
        this._gameSettings.write(writer);
        this._gameObjectManager.write(writer);
        this._gameData.write(writer);
    }
    fromJSON(value) {
        // TODO: validate json value
        this._saveRoot.fromJSON(value.saveRoot);
        this._gameSettings.fromJSON(value.gameSettings);
        this._gameObjectManager.fromJSON(value.gameObjects);
        this._gameData.fromJSON(value.gameData);
    }
    toJSON() {
        return {
            saveRoot: this._saveRoot.toJSON(),
            gameSettings: this._gameSettings.toJSON(),
            gameObjects: this._gameObjectManager.toJSON(),
            gameData: this._gameData.toJSON()
        };
    }
};
SaveBodyInstanceImpl = __decorate([
    microinject_1.injectable(services_1.SaveBodyInstance),
    microinject_1.inScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(services_1.SaveGameHeaderInstance)),
    __param(1, microinject_1.inject(services_1.GameSaveRootInstance)),
    __param(2, microinject_1.inject(services_1.GameSettingsInstance)),
    __param(3, microinject_1.inject(services_1.GameObjectManager)),
    __param(4, microinject_1.inject(services_1.GameSaveDataInstance))
], SaveBodyInstanceImpl);
exports.SaveBodyInstanceImpl = SaveBodyInstanceImpl;
//# sourceMappingURL=save-body.js.map