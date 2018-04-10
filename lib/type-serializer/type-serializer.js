"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const services_1 = require("./services");
let TypeSerializerImpl = class TypeSerializerImpl {
    constructor() {
        this._infoByName = new Map();
        this._infoByType = new Map();
    }
    parseDescriptor(reader) {
        this._buildCache();
        const id = reader.readByte();
        const type = this._infoByType.get(id);
        if (!type) {
            throw new Error(`Failed to parse type descriptor: Type ID ${id} has no registered serialization info.`);
        }
        const descriptor = type.parseDescriptor(reader);
        return descriptor;
    }
    writeDescriptor(writer, descriptor) {
        this._buildCache();
        const name = descriptor.name;
        const type = this._infoByName.get(name);
        if (!type) {
            throw new Error(`Failed to write type descriptor: Descriptor name ${name} has no registered serialization info.`);
        }
        writer.writeByte(type.id);
        type.writeDescriptor(writer, descriptor);
    }
    parseType(reader, descriptor) {
        const serializer = this._getSerializationInfo(descriptor);
        return serializer.parseType(reader, descriptor);
    }
    writeType(writer, descriptor, value) {
        const serializer = this._getSerializationInfo(descriptor);
        serializer.writeType(writer, descriptor, value);
    }
    hasTemplatedType(templateName) {
        return this._templateRegistry.has(templateName);
    }
    _getSerializationInfo(descriptor) {
        if (!this._serializerInfos) {
            throw new Error("Serialization info objects have not been provided.");
        }
        this._buildCache();
        const serializer = this._infoByName.get(descriptor.name);
        if (!serializer) {
            throw new Error(`No serializer exists for type "${descriptor.name}".`);
        }
        return serializer;
    }
    _buildCache() {
        if (!this._serializerInfos || this._infoByName.size !== 0) {
            return;
        }
        for (let info of this._serializerInfos) {
            if (this._infoByName.has(info.name)) {
                throw new Error(`Duplicate serializer type info name: "${info.name}".`);
            }
            this._infoByName.set(info.name, info);
            const lastIdDefiner = this._infoByType.get(info.id);
            if (lastIdDefiner !== undefined) {
                throw new Error(`Duplicate serializer type info ID: ${info.id} from name "${info.name}" (defined by "${lastIdDefiner.name}").`);
            }
            this._infoByType.set(info.id, info);
        }
    }
};
__decorate([
    microinject_1.inject(services_1.TypeSerializationInfo, { all: true })
], TypeSerializerImpl.prototype, "_serializerInfos", void 0);
__decorate([
    microinject_1.inject(services_1.TypeTemplateRegistry)
], TypeSerializerImpl.prototype, "_templateRegistry", void 0);
TypeSerializerImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(services_1.TypeSerializer),
    microinject_1.provides(services_1.TypeDescriptorSerializer),
    microinject_1.singleton()
], TypeSerializerImpl);
exports.TypeSerializerImpl = TypeSerializerImpl;
//# sourceMappingURL=type-serializer.js.map