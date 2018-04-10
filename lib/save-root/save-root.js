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
const type_serializer_1 = require("../type-serializer");
const assembly_types_1 = require("../assembly-types");
const services_1 = require("./services");
let OniSaveRootImpl = class OniSaveRootImpl {
    constructor(_typeSerializer) {
        this._typeSerializer = _typeSerializer;
        this._saveFileRoot = null;
    }
    get widthInCells() {
        return utils_1.ensureNotNull(this._saveFileRoot).WidthInCells;
    }
    get heightInCells() {
        return utils_1.ensureNotNull(this._saveFileRoot).HeightInCells;
    }
    get streamed() {
        return utils_1.ensureNotNull(this._saveFileRoot).streamed;
    }
    parse(reader) {
        const rootName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== assembly_types_1.SaveFileRoot) {
            throw new Error(`Expected to find "${assembly_types_1.SaveFileRoot}", but got "${rootName}"`);
        }
        this._saveFileRoot = this._typeSerializer.parseTemplatedType(reader, assembly_types_1.SaveFileRoot);
    }
    write(writer) {
        if (!this._saveFileRoot) {
            throw new Error("Failed to write SaveFileRoot: No root loaded.");
        }
        writer.writeKleiString(assembly_types_1.SaveFileRoot);
        this._typeSerializer.writeTemplatedType(writer, assembly_types_1.SaveFileRoot, this._saveFileRoot);
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
    __param(0, microinject_1.inject(type_serializer_1.TypeSerializer))
], OniSaveRootImpl);
exports.OniSaveRootImpl = OniSaveRootImpl;
//# sourceMappingURL=save-root.js.map