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
const oni_save_1 = require("../oni-save");
const type_templates_1 = require("../type-templates");
const assembly_types_1 = require("../assembly-types");
const services_1 = require("./services");
let OniSaveRootImpl = class OniSaveRootImpl {
    constructor(_deserializer) {
        this._deserializer = _deserializer;
        this._widthInCells = null;
        this._heightInCells = null;
        this._streamed = null;
    }
    get widthInCells() {
        return utils_1.ensureNotNull(this._widthInCells);
    }
    get heightInCells() {
        return utils_1.ensureNotNull(this._heightInCells);
    }
    get streamed() {
        return utils_1.ensureNotNull(this._streamed);
    }
    parse(reader) {
        const saveFileRoot = this._deserializer.deserialize(reader, assembly_types_1.SaveFileRoot);
        this._widthInCells = saveFileRoot.WidthInCells;
        this._heightInCells = saveFileRoot.HeightInCells;
        this._streamed = saveFileRoot.streamed;
    }
    toJSON() {
        const streamed = {};
        for (let pair of this.streamed) {
            streamed[pair[0]] = pair[1];
        }
        return {
            widthInCells: this.widthInCells,
            heightInCells: this.heightInCells,
            streamed
        };
    }
};
OniSaveRootImpl = __decorate([
    microinject_1.injectable(services_1.OniSaveRoot),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(type_templates_1.TypeDeserializer))
], OniSaveRootImpl);
exports.OniSaveRootImpl = OniSaveRootImpl;
//# sourceMappingURL=save-root.js.map