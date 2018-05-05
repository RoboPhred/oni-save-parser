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
const parse_steps_1 = require("../../../parse-steps");
const utils_1 = require("../../../utils");
const services_1 = require("../services");
const services_2 = require("./services");
let TypeTemplateRegistryImpl = class TypeTemplateRegistryImpl {
    constructor(_stepExecutor) {
        this._stepExecutor = _stepExecutor;
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
        this._stepExecutor.for("type-templates", templateCount, index => {
            const name = utils_1.validateDotNetIdentifierName(reader.readKleiString());
            if (this._templates.has(name)) {
                throw new Error(`Failed to parse type template: A template named "${name}" already exists.`);
            }
            const template = this._parseTemplate(name, reader);
            this._templates.set(name, template);
            this._templateNameOrderings[index] = name;
        });
    }
    write(writer) {
        writer.writeInt32(this._templateNameOrderings.length);
        this._stepExecutor.forEach("type-templates", this._templateNameOrderings, templateName => {
            const template = this._templates.get(templateName);
            if (!template) {
                throw new Error(`Failed to write type template: A template in templateNameOrderings was not in the template map.`);
            }
            writer.writeKleiString(templateName);
            this._writeTemplate(writer, template);
        });
    }
    fromJSON(value) {
        this._templates = new Map();
        this._templateNameOrderings = new Array(value.length);
        for (let i = 0; i < value.length; i++) {
            const template = value[i];
            this._templateNameOrderings[i] = template.name;
            this._templates.set(template.name, template);
        }
    }
    toJSON() {
        return this._templateNameOrderings.map(x => this._templates.get(x));
    }
    parseTemplatedType(reader, templateName) {
        const template = this.get(templateName);
        if (!template) {
            throw new Error(`Failed to parse object: Template name "${templateName}" is not in the template registry.`);
        }
        const obj = {};
        // We parse fields, then properties, in order of appearance.
        for (let field of template.fields) {
            const { name, type } = field;
            const data = this._typeSerializer.parseType(reader, type);
            obj[name] = data;
        }
        for (let property of template.properties) {
            const { name, type } = property;
            const data = this._typeSerializer.parseType(reader, type);
            obj[name] = data;
        }
        return obj;
    }
    writeTemplatedType(writer, templateName, value) {
        const template = this.get(templateName);
        if (!template) {
            throw new Error(`Failed to write object: Template name "${templateName}" is not in the template registry.`);
        }
        // We parse fields, then properties, in order of appearance.
        for (let field of template.fields) {
            const { name, type } = field;
            const data = value[name];
            this._typeSerializer.writeType(writer, type, data);
        }
        for (let property of template.properties) {
            const { name, type } = property;
            const data = value[name];
            this._typeSerializer.writeType(writer, type, data);
        }
    }
    _parseTemplate(name, reader) {
        return this._stepExecutor.do(name, () => {
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
                name,
                fields,
                properties
            };
        });
    }
    _writeTemplate(writer, template) {
        this._stepExecutor.do(template.name, () => {
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
        });
    }
};
__decorate([
    microinject_1.inject(services_2.TypeDescriptorSerializer)
], TypeTemplateRegistryImpl.prototype, "_typeDescriptorSerializer", void 0);
__decorate([
    microinject_1.inject(services_2.TypeSerializer)
], TypeTemplateRegistryImpl.prototype, "_typeSerializer", void 0);
TypeTemplateRegistryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(services_2.TypeTemplateRegistry),
    microinject_1.provides(services_2.TypeTemplateSerializer),
    microinject_1.inScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(parse_steps_1.ParseStepExecutor))
], TypeTemplateRegistryImpl);
exports.TypeTemplateRegistryImpl = TypeTemplateRegistryImpl;
//# sourceMappingURL=template-registry.js.map