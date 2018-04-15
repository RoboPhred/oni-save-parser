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
const AssemblyTypeName = "Klei.SaveFileRoot";
let GameSaveRootInstanceImpl = class GameSaveRootInstanceImpl {
    constructor(_templateSerializer) {
        this._templateSerializer = _templateSerializer;
        this._data = null;
    }
    get widthInCells() {
        return utils_1.ensureNotNull(this._data).WidthInCells;
    }
    get heightInCells() {
        return utils_1.ensureNotNull(this._data).HeightInCells;
    }
    get streamed() {
        const streamed = utils_1.ensureNotNull(this._data).streamed;
        const obj = {};
        for (let [key, value] of streamed) {
            obj[key] = value;
        }
        return obj;
    }
    parse(reader) {
        const rootName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== AssemblyTypeName) {
            throw new Error(`Failed to parse GameSaveRoot: Expected to find "${AssemblyTypeName}", but got "${rootName}"`);
        }
        this._data = this._templateSerializer.parseTemplatedType(reader, AssemblyTypeName);
    }
    write(writer) {
        if (!this._data) {
            throw new Error("Failed to write SaveFileRoot: Data has not been parsed.");
        }
        writer.writeKleiString(AssemblyTypeName);
        this._templateSerializer.writeTemplatedType(writer, AssemblyTypeName, this._data);
    }
    fromJSON(value) {
        // TODO: validate json value
        const streamed = new Map();
        for (let key of Object.keys(value.streamed)) {
            streamed.set(key, value.streamed[key]);
        }
        this._data = {
            WidthInCells: value.widthInCells,
            HeightInCells: value.heightInCells,
            streamed
        };
    }
    toJSON() {
        return {
            widthInCells: this.widthInCells,
            heightInCells: this.heightInCells,
            streamed: this.streamed
        };
    }
};
GameSaveRootInstanceImpl = __decorate([
    microinject_1.injectable(services_1.GameSaveRootInstance),
    microinject_1.inScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(type_serializer_1.TypeTemplateSerializer))
], GameSaveRootInstanceImpl);
exports.GameSaveRootInstanceImpl = GameSaveRootInstanceImpl;
//# sourceMappingURL=game-save-root.js.map