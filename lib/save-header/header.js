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
const save_data_1 = require("../save-data");
const services_1 = require("./services");
let OniSaveHeaderImpl = class OniSaveHeaderImpl {
    parse(reader) {
        this.buildVersion = reader.readUInt32();
        const headerSize = reader.readUInt32();
        this.headerVersion = reader.readUInt32();
        this.isCompressed = this.headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;
        const data = reader.readBytes(headerSize);
        const dataStr = new text_encoding_1.TextDecoder("utf-8").decode(data);
        this.gameData = JSON.parse(dataStr);
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
    microinject_1.inScope(save_data_1.OniSaveData)
], OniSaveHeaderImpl);
exports.OniSaveHeaderImpl = OniSaveHeaderImpl;
//# sourceMappingURL=header.js.map