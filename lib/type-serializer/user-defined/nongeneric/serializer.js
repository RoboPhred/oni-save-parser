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
const binary_serializer_1 = require("../../../binary-serializer");
const interfaces_1 = require("../../interfaces");
const services_1 = require("../../services");
let UserDefinedTypeSerializer = class UserDefinedTypeSerializer {
    constructor(_templateRegistry, _typeSerializer) {
        this._templateRegistry = _templateRegistry;
        this._typeSerializer = _typeSerializer;
        this.id = interfaces_1.TypeID.UserDefined;
        this.name = "user-defined";
    }
    parseDescriptor(reader) {
        const templateName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        return {
            name: this.name,
            templateName
        };
    }
    writeDescriptor(writer, descriptor) {
        writer.writeKleiString(descriptor.templateName);
    }
    parseType(reader, descriptor) {
        const templateName = descriptor.templateName;
        const template = this._templateRegistry.get(templateName);
        if (!template) {
            throw new Error(`Failed to parse object: Template name "${templateName}" is not in the template registry.`);
        }
        const dataLength = reader.readInt32();
        if (dataLength < 0) {
            return null;
        }
        const parseStart = reader.position;
        const obj = this._typeSerializer.parseTemplatedType(reader, templateName);
        const parseLength = reader.position - parseStart;
        if (parseLength !== dataLength) {
            throw new Error(`Failed to parse object: Template name "${templateName}" parsed ${Math.abs(parseLength - dataLength)} ${parseLength > dataLength ? "more" : "less"} than expected.`);
        }
        return obj;
    }
    writeType(writer, descriptor, value) {
        const templateName = descriptor.templateName;
        const template = this._templateRegistry.get(templateName);
        if (!template) {
            throw new Error(`Failed to write object: Template name "${templateName}" is not in the template registry.`);
        }
        if (value == null) {
            writer.writeInt32(-1);
        }
        else {
            const dataWriter = new binary_serializer_1.ArrayDataWriter();
            this._typeSerializer.writeTemplatedType(dataWriter, templateName, value);
            writer.writeInt32(dataWriter.position);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
};
UserDefinedTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    __param(0, microinject_1.inject(services_1.TypeTemplateRegistry)),
    __param(1, microinject_1.inject(services_1.TypeSerializer))
], UserDefinedTypeSerializer);
exports.UserDefinedTypeSerializer = UserDefinedTypeSerializer;
//# sourceMappingURL=serializer.js.map