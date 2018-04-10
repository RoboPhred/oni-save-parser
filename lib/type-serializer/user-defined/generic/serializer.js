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
let UserDefinedGenericTypeSerializer = class UserDefinedGenericTypeSerializer {
    constructor(_templateRegistry, _descriptorSerializer, _typeSerializer) {
        this._templateRegistry = _templateRegistry;
        this._descriptorSerializer = _descriptorSerializer;
        this._typeSerializer = _typeSerializer;
        this.id = interfaces_1.TypeID.UserDefinedGeneric;
        this.name = "user-defined-generic";
    }
    parseDescriptor(reader) {
        const templateName = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        // Generic type.  Read in the generics.
        //  This is performed after we fetch the template name.
        const genericCount = reader.readByte();
        const genericTypes = new Array(genericCount);
        for (let i = 0; i < genericCount; i++) {
            const type = this._descriptorSerializer.parseDescriptor(reader);
            genericTypes[i] = type;
        }
        return {
            name: this.name,
            templateName,
            genericTypes
        };
    }
    writeDescriptor(writer, descriptor) {
        const { templateName, genericTypes } = descriptor;
        utils_1.validateDotNetIdentifierName(templateName);
        if (!genericTypes) {
            throw new Error("Failed to write object: Generic object has no generic type data.");
        }
        writer.writeKleiString(descriptor.templateName);
        // Generic type.  Write out the generics.
        //  This is performed after we write the template name.
        writer.writeByte(genericTypes.length);
        for (let type of genericTypes) {
            this._descriptorSerializer.writeDescriptor(writer, type);
        }
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
UserDefinedGenericTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    __param(0, microinject_1.inject(services_1.TypeTemplateRegistry)),
    __param(1, microinject_1.inject(services_1.TypeDescriptorSerializer)),
    __param(2, microinject_1.inject(services_1.TypeSerializer))
], UserDefinedGenericTypeSerializer);
exports.UserDefinedGenericTypeSerializer = UserDefinedGenericTypeSerializer;
//# sourceMappingURL=serializer.js.map