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
const utils_1 = require("../utils");
const oni_save_1 = require("../oni-save");
const services_1 = require("./services");
let OniSaveHeaderImpl = class OniSaveHeaderImpl {
    constructor() {
        this._buildVersion = null;
        this._headerVersion = null;
        this._isCompressed = null;
        this._gameData = null;
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
    get gameData() {
        return utils_1.ensureNotNull(this._gameData);
    }
    parse(reader) {
        this._buildVersion = reader.readUInt32();
        const headerSize = reader.readUInt32();
        this._headerVersion = reader.readUInt32();
        this._isCompressed = this._headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;
        const data = reader.readBytes(headerSize);
        const dataStr = new text_encoding_1.TextDecoder("utf-8").decode(data);
        this._gameData = JSON.parse(dataStr);
    }
    toJSON() {
        return {
            buildVersion: this.buildVersion,
            headerVersion: this.headerVersion,
            isCompressed: this.isCompressed,
            gameData: this.gameData
        };
    }
};
OniSaveHeaderImpl = __decorate([
    microinject_1.injectable(services_1.OniSaveHeader),
    microinject_1.inScope(oni_save_1.OniSave)
], OniSaveHeaderImpl);
exports.OniSaveHeaderImpl = OniSaveHeaderImpl;
//# sourceMappingURL=header.js.map