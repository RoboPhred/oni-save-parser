"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_encoding_1 = require("text-encoding");
const microinject_1 = require("microinject");
const utils_1 = require("../../../utils");
const services_1 = require("../services");
let SaveGameHeaderInstanceImpl = class SaveGameHeaderInstanceImpl {
    constructor() {
        this._buildVersion = null;
        this._headerVersion = null;
        this._isCompressed = null;
        this._gameInfo = null;
    }
    get buildVersion() {
        return utils_1.ensureNotNull(this._buildVersion);
    }
    get headerVersion() {
        return utils_1.ensureNotNull(this._headerVersion);
    }
    get isCompressed() {
        return utils_1.ensureNotNull(this._isCompressed);
    }
    get gameInfo() {
        return utils_1.ensureNotNull(this._gameInfo);
    }
    parse(reader) {
        this._buildVersion = reader.readUInt32();
        const headerSize = reader.readUInt32();
        this._headerVersion = reader.readUInt32();
        this._isCompressed = this._headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;
        const infoBytes = reader.viewBytes(headerSize);
        const infoStr = new text_encoding_1.TextDecoder("utf-8").decode(infoBytes);
        this._gameInfo = JSON.parse(infoStr);
    }
    write(writer) {
        const buildVersion = utils_1.ensureNotNull(this._buildVersion);
        const headerVersion = utils_1.ensureNotNull(this._headerVersion);
        const isCompressed = utils_1.ensureNotNull(this._isCompressed);
        const infoStr = JSON.stringify(utils_1.ensureNotNull(this._gameInfo));
        const headerBytes = new text_encoding_1.TextEncoder("utf-8").encode(infoStr);
        writer.writeUInt32(buildVersion);
        writer.writeUInt32(headerBytes.byteLength);
        writer.writeUInt32(headerVersion);
        if (headerVersion >= 1) {
            writer.writeUInt32(isCompressed ? 1 : 0);
        }
        writer.writeBytes(headerBytes.buffer);
    }
    fromJSON(value) {
        this._buildVersion = value.buildVersion;
        this._headerVersion = value.headerVersion;
        this._isCompressed = value.isCompressed;
        this._gameInfo = value.gameInfo;
    }
    toJSON() {
        return {
            buildVersion: this.buildVersion,
            headerVersion: this.headerVersion,
            isCompressed: this.isCompressed,
            gameInfo: this.gameInfo
        };
    }
};
SaveGameHeaderInstanceImpl = __decorate([
    microinject_1.injectable(services_1.SaveGameHeaderInstance),
    microinject_1.inScope(services_1.SaveGameScope)
], SaveGameHeaderInstanceImpl);
exports.SaveGameHeaderInstanceImpl = SaveGameHeaderInstanceImpl;
//# sourceMappingURL=save-game-header.js.map