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
const services_1 = require("../logging/services");
const save_data_1 = require("../save-data");
const interfaces_1 = require("./interfaces");
const services_2 = require("./services");
let TypeTemplateRegistryImpl = class TypeTemplateRegistryImpl {
    constructor(_logger) {
        this._logger = _logger;
        this._templates = new Map();
    }
    parse(reader) {
        this._logger.trace("Parsing type templates.");
        const templateCount = reader.readInt32();
        this._logger.trace(`${templateCount} templates found.`);
        for (let i = 0; i < templateCount; i++) {
            const templateName = reader.readKleiString();
            this._logger.trace(`Parsing template "${templateName}".`);
            const template = this._parseTemplate(reader);
            this._logger.trace(`Done parsing template "${templateName}".`);
            this._templates.set(templateName, template);
        }
    }
    deserialize(reader, templateName) {
        if (!templateName) {
            templateName = reader.readKleiString();
        }
        if (templateName.length >= 512) {
            // We can reasonably assume anything over 512 characters is a bad parse and not a real template.
            //  Specifically, anything at or over 512 makes a "CS0645: Identifier too long." error in Microsoft's C# compiler.
            //  The .Net standard itself does not specify any limit.
            // We want to bail out in these cases without trying to include the template name in the error, as it is likely to be
            //  enormous.
            throw new Error("Received templateName >= 512 characters.  This most likely indicates a failure to parse the template name.");
        }
        const template = this._templates.get(templateName);
        if (!template) {
            throw new Error(`Cannot deserialize type template "${templateName}": Template does not exist.`);
        }
        const obj = {};
        for (let field of template.fields) {
            const value = this._deserializeType(reader, field);
            obj[field.typeName] = value;
        }
        for (let prop of template.properties) {
            const value = this._deserializeType(reader, prop);
            obj[prop.typeName] = value;
        }
        return obj;
    }
    toJSON() {
        const templates = {};
        for (let entry of this._templates.entries()) {
            templates[entry[0]] = entry[1];
        }
        return {
            templates
        };
    }
    _parseTemplate(reader) {
        const fieldCount = reader.readInt32();
        const propCount = reader.readInt32();
        this._logger.trace(`Template has ${fieldCount} fields and ${propCount} properties.`);
        const fields = [];
        for (let i = 0; i < fieldCount; i++) {
            const typeName = reader.readKleiString();
            this._logger.trace(`Parsing field "${typeName}".`);
            fields[i] = Object.assign({ typeName }, readType(reader));
        }
        this._logger.trace("All fields parsed.");
        const properties = [];
        for (let i = 0; i < propCount; i++) {
            const typeName = reader.readKleiString();
            this._logger.trace(`Parsing property "${typeName}".`);
            properties[i] = Object.assign({ typeName }, readType(reader));
        }
        this._logger.trace("All properties parsed.");
        const template = {
            fields,
            properties
        };
        return template;
    }
    _deserializeType(reader, descriptor) {
        switch (descriptor.typeInfo) {
            case interfaces_1.TypeInfo.UserDefined: {
                // First value seems to indicate nullability.
                if (reader.readInt32() >= 0) {
                    return this.deserialize(reader, descriptor.templateName);
                }
                else {
                    return null;
                }
            }
            case interfaces_1.TypeInfo.SByte:
                return reader.readSByte();
            case interfaces_1.TypeInfo.Byte:
                return reader.readByte();
            case interfaces_1.TypeInfo.Boolean:
                return reader.readByte() == 1;
            case interfaces_1.TypeInfo.Int16:
                return reader.readInt16();
            case interfaces_1.TypeInfo.UInt16:
                return reader.readUInt16();
            case interfaces_1.TypeInfo.Int32:
                return reader.readInt32();
            case interfaces_1.TypeInfo.UInt32:
                return reader.readUInt32();
            case interfaces_1.TypeInfo.Int64:
                return reader.readInt64();
            case interfaces_1.TypeInfo.UInt64:
                return reader.readUInt64();
            case interfaces_1.TypeInfo.Single:
                return reader.readSingle();
            case interfaces_1.TypeInfo.Double:
                return reader.readDouble();
            case interfaces_1.TypeInfo.String:
                return reader.readKleiString();
            case interfaces_1.TypeInfo.Enumeration:
                return reader.readInt32();
            case interfaces_1.TypeInfo.Vector2I:
                return {
                    x: reader.readInt32(),
                    y: reader.readInt32()
                };
            case interfaces_1.TypeInfo.Vector2:
                return {
                    x: reader.readSingle(),
                    y: reader.readSingle()
                };
            case interfaces_1.TypeInfo.Vector3:
                return {
                    x: reader.readSingle(),
                    y: reader.readSingle(),
                    z: reader.readSingle()
                };
            case interfaces_1.TypeInfo.Array:
            case interfaces_1.TypeInfo.List:
            case interfaces_1.TypeInfo.HashSet: {
                // Always read and discarded.
                //  No idea what this is, its variable
                //  seems to be optimized out in the ONI assembly.
                reader.readInt32();
                const length = reader.readInt32();
                if (length >= 0) {
                    const subType = descriptor.subTypes[0];
                    const array = new Array(length);
                    for (let i = 0; i < length; i++) {
                        const value = this._deserializeType(reader, subType);
                        array[i] = value;
                    }
                    return array;
                }
                else {
                    return null;
                }
            }
            case interfaces_1.TypeInfo.Pair: {
                const [type1, type2] = descriptor.subTypes;
                return {
                    key: this._deserializeType(reader, type1),
                    value: this._deserializeType(reader, type2)
                };
            }
            case interfaces_1.TypeInfo.Dictionary: {
                // Again, read and discarded.
                //  Similar to TypeInfo.Array
                reader.readInt32();
                const length = reader.readInt32();
                if (length > 0) {
                    const [keyType, valueType] = descriptor.subTypes;
                    const pairs = [];
                    // We load values first, then keys.
                    for (let i = 0; i < length; i++) {
                        pairs[i] = new Array(2);
                        pairs[i][1] = this._deserializeType(reader, valueType);
                    }
                    for (let i = 0; i < length; i++) {
                        pairs[i][0] = this._deserializeType(reader, keyType);
                    }
                    return new Map(pairs);
                }
                else {
                    return null;
                }
            }
            case interfaces_1.TypeInfo.Colour: {
                return {
                    r: reader.readByte() / 255,
                    b: reader.readByte() / 255,
                    g: reader.readByte() / 255,
                    a: reader.readByte() / 255
                };
            }
            default:
                throwUnknownTypeInfo(descriptor.typeInfo);
        }
    }
};
TypeTemplateRegistryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(services_2.TypeTemplateRegistry),
    microinject_1.provides(services_2.TypeDeserializer),
    microinject_1.inScope(save_data_1.OniSaveData),
    __param(0, microinject_1.inject(services_1.Logger))
], TypeTemplateRegistryImpl);
exports.TypeTemplateRegistryImpl = TypeTemplateRegistryImpl;
function throwUnknownTypeInfo(typeInfo) {
    throw new Error(`Unknown type info "${typeInfo}"`);
}
function readType(reader) {
    const typeData = reader.readByte();
    const typeInfo = typeData & interfaces_1.TypeInfo.VALUE_MASK;
    const isGeneric = Boolean(typeData & interfaces_1.TypeInfo.IS_GENERIC_TYPE);
    const descriptor = {
        typeInfo
    };
    // This occurs before generic resolution, if we are a generic.
    if (typeInfo === interfaces_1.TypeInfo.UserDefined || typeInfo === interfaces_1.TypeInfo.Enumeration) {
        // The ONI code (KSerialization.DeserializationTemplate)
        //  does a lookup of the template here, so presumably it will error out
        //  if it has not been previously parsed.
        // We will skip that step for now, since we look things up dynamically.
        descriptor.templateName = reader.readKleiString();
    }
    if (isGeneric) {
        const subTypeCount = reader.readByte();
        const subTypes = descriptor.subTypes = new Array(subTypeCount);
        for (let i = 0; i < subTypeCount; i++) {
            subTypes[i] = readType(reader);
        }
    }
    else if (typeInfo === interfaces_1.TypeInfo.Array) {
        // There is special code for handling arrays.
        //  Apparently, they are never generic but always specify a type.
        descriptor.subTypes = [
            readType(reader)
        ];
    }
    return descriptor;
}
//# sourceMappingURL=template-registry.js.map