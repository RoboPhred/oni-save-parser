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
const logging_1 = require("../../../logging");
const utils_1 = require("../../../utils");
const services_1 = require("../services");
let SaveBodyInstanceImpl = SaveBodyInstanceImpl_1 = class SaveBodyInstanceImpl {
    constructor(_header, _saveRoot, _gameSettings, _gameObjectManager, _gameData, _logger) {
        this._header = _header;
        this._saveRoot = _saveRoot;
        this._gameSettings = _gameSettings;
        this._gameObjectManager = _gameObjectManager;
        this._gameData = _gameData;
        this._logger = _logger;
        this._versionMinor = null;
    }
    get saveRoot() {
        return utils_1.ensureNotNull(this._saveRoot);
    }
    get gameSettings() {
        return utils_1.ensureNotNull(this._gameSettings);
    }
    get versionMajor() {
        return SaveBodyInstanceImpl_1.CURRENT_VERSION_MAJOR;
    }
    get versionMinor() {
        return utils_1.ensureNotNull(this._versionMinor);
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
        const expectedHeader = SaveBodyInstanceImpl_1.SAVE_HEADER;
        const header = reader.readChars(expectedHeader.length);
        if (header !== expectedHeader) {
            throw new Error(`Failed to parse SaveBody: Expected "${expectedHeader}" but got "${header}" (${Array.from(header).map(x => x.charCodeAt(0))})`);
        }
        const expectedMajor = SaveBodyInstanceImpl_1.CURRENT_VERSION_MAJOR;
        const expectedMinor = SaveBodyInstanceImpl_1.CURRENT_VERSION_MINOR;
        const versionMajor = reader.readInt32();
        const versionMinor = reader.readInt32();
        if (versionMajor !== expectedMajor) {
            throw new Error(`Failed to parse SaveBody: Version mismatch: Expected major version ${expectedMajor} but got ${versionMajor}.`);
        }
        if (versionMinor > expectedMinor) {
            // If they stick to semver, then minor changes should in theory be backwards compatible with older versions.
            //  This means its likely we can parse this correctly, but not guarenteed.
            // It's worth noting that the ONI itself will refuse to load a minor version higher than it understands.
            if (this._logger)
                this._logger.warn(`SaveBody version ${versionMajor}.${versionMinor} has a higher minor version than expected ${expectedMajor}.${expectedMinor}.  Problems may occur with parsing.`);
        }
        this._versionMinor = versionMinor;
        this._gameObjectManager.parse(reader);
        this._gameData.parse(reader);
    }
    _writeState(writer) {
        if (!this._versionMinor) {
            throw new Error(`Failed to write SaveBody: Data has not been loaded.`);
        }
        writer.writeKleiString("world");
        this._saveRoot.write(writer);
        this._gameSettings.write(writer);
        writer.writeChars(SaveBodyInstanceImpl_1.SAVE_HEADER);
        writer.writeInt32(SaveBodyInstanceImpl_1.CURRENT_VERSION_MAJOR);
        writer.writeInt32(this._versionMinor);
        this._gameObjectManager.write(writer);
        this._gameData.write(writer);
    }
    fromJSON(value) {
        if (value.versionMajor !== SaveBodyInstanceImpl_1.CURRENT_VERSION_MAJOR) {
            throw new Error(`Failed to parse SaveBody: Version mismatch: Expected major version ${SaveBodyInstanceImpl_1.CURRENT_VERSION_MAJOR} but got ${value.versionMajor}.`);
        }
        // TODO: validate json value
        this._saveRoot.fromJSON(value.saveRoot);
        this._gameSettings.fromJSON(value.gameSettings);
        this._versionMinor = value.versionMinor;
        this._gameObjectManager.fromJSON(value.gameObjects);
        this._gameData.fromJSON(value.gameData);
    }
    toJSON() {
        if (!this._versionMinor) {
            throw new Error(`Failed to serialize SaveBody: Data has not been loaded.`);
        }
        return {
            saveRoot: this._saveRoot.toJSON(),
            gameSettings: this._gameSettings.toJSON(),
            versionMajor: SaveBodyInstanceImpl_1.CURRENT_VERSION_MAJOR,
            versionMinor: this._versionMinor,
            gameObjects: this._gameObjectManager.toJSON(),
            gameData: this._gameData.toJSON()
        };
    }
};
SaveBodyInstanceImpl.SAVE_HEADER = "KSAV";
SaveBodyInstanceImpl.CURRENT_VERSION_MAJOR = 7;
SaveBodyInstanceImpl.CURRENT_VERSION_MINOR = 3;
SaveBodyInstanceImpl = SaveBodyInstanceImpl_1 = __decorate([
    microinject_1.injectable(services_1.SaveBodyInstance),
    microinject_1.inScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(services_1.SaveGameHeaderInstance)),
    __param(1, microinject_1.inject(services_1.GameSaveRootInstance)),
    __param(2, microinject_1.inject(services_1.GameSettingsInstance)),
    __param(3, microinject_1.inject(services_1.GameObjectManager)),
    __param(4, microinject_1.inject(services_1.GameSaveDataInstance)),
    __param(5, microinject_1.inject(logging_1.Logger)), __param(5, microinject_1.optional())
], SaveBodyInstanceImpl);
exports.SaveBodyInstanceImpl = SaveBodyInstanceImpl;
var SaveBodyInstanceImpl_1;
//# sourceMappingURL=save-body.js.map