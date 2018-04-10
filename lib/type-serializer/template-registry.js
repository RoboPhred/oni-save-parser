"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const utils_1 = require("../utils");
const services_1 = require("./services");
let TypeTemplateRegistryImpl = class TypeTemplateRegistryImpl {
    constructor() {
        this._templates = new Map();
        this._templateNameOrderings = [];
    }
    has(templateName) {
        return this._templates.has(templateName);
    }
    get(templateName) {
        return this._templates.get(templateName);
    }
    parse(reader) {
        const templateCount = reader.readInt32();
        this._templateNameOrderings = new Array(templateCount);
        for (let i = 0; i < templateCount; i++) {
            const name = utils_1.validateDotNetIdentifierName(reader.readKleiString());
            if (this._templates.has(name)) {
                throw new Error(`Failed to parse type template: A template named "${name}" already exists.`);
            }
            const template = this._parseTemplate(reader);
            this._templates.set(name, template);
            this._templateNameOrderings[i] = name;
        }
    }
    write(writer) {
        writer.writeInt32(this._templateNameOrderings.length);
        for (let templateName of this._templateNameOrderings) {
            const template = this._templates.get(templateName);
            if (!template) {
                throw new Error(`Failed to write type template: A template in templateNameOrderings was not in the template map.`);
            }
            writer.writeKleiString(templateName);
            this._writeTemplate(writer, template);
        }
    }
    _parseTemplate(reader) {
        const fieldCount = reader.readInt32();
        const propCount = reader.readInt32();
        const fields = new Array(fieldCount);
        for (let i = 0; i < fieldCount; i++) {
            const name = utils_1.validateDotNetIdentifierName(reader.readKleiString());
            const type = this._typeDescriptorSerializer.parseDescriptor(reader);
            fields[i] = {
                name,
                type
            };
        }
        const properties = new Array(propCount);
        for (let i = 0; i < propCount; i++) {
            const name = utils_1.validateDotNetIdentifierName(reader.readKleiString());
            const type = this._typeDescriptorSerializer.parseDescriptor(reader);
            properties[i] = {
                name,
                type
            };
        }
        return {
            fields,
            properties
        };
    }
    _writeTemplate(writer, template) {
        const { fields, properties } = template;
        writer.writeInt32(fields.length);
        writer.writeInt32(properties.length);
        for (let field of fields) {
            const { name, type } = field;
            writer.writeKleiString(name);
            this._typeDescriptorSerializer.writeDescriptor(writer, type);
        }
        for (let property of properties) {
            const { name, type } = property;
            writer.writeKleiString(name);
            this._typeDescriptorSerializer.writeDescriptor(writer, type);
        }
    }
};
__decorate([
    microinject_1.inject(services_1.TypeDescriptorSerializer)
], TypeTemplateRegistryImpl.prototype, "_typeDescriptorSerializer", void 0);
TypeTemplateRegistryImpl = __decorate([
    microinject_1.injectable(services_1.TypeTemplateRegistry),
    microinject_1.singleton()
], TypeTemplateRegistryImpl);
exports.TypeTemplateRegistryImpl = TypeTemplateRegistryImpl;
//# sourceMappingURL=template-registry.js.map