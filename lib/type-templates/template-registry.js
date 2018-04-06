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
const services_1 = require("../logging/services");
const binary_serializer_1 = require("../binary-serializer");
const oni_save_1 = require("../oni-save");
const interfaces_1 = require("./interfaces");
const services_2 = require("./services");
let TypeTemplateRegistryImpl = class TypeTemplateRegistryImpl {
    constructor(_logger) {
        this._logger = _logger;
        this._templates = new Map();
        this._orderedTemplateNames = [];
    }
    parse(reader) {
        this._logger.trace("Parsing type templates.");
        const templateCount = reader.readInt32();
        this._logger.trace(`${templateCount} templates found.`);
        for (let i = 0; i < templateCount; i++) {
            const templateName = validateTypeName(reader.readKleiString());
            this._orderedTemplateNames.push(templateName);
            this._logger.trace(`Parsing template "${templateName}".`);
            const template = this._parseTemplate(reader);
            this._logger.trace(`Done parsing template "${templateName}".`);
            this._templates.set(templateName, template);
        }
    }
    write(writer) {
        writer.writeInt32(this._orderedTemplateNames.length);
        // ONI checks existence of sub-templates while parsing templates,
        //  so we should ensure the order we write them back in is the same
        //  as we read them.
        for (let templateName of this._orderedTemplateNames) {
            const template = this._templates.get(templateName);
            writer.writeKleiString(templateName);
            this._writeTemplate(writer, template);
        }
    }
    hasType(typeName) {
        return this._templates.has(typeName);
    }
    deserialize(reader, expectedType) {
        const templateName = validateTypeName(reader.readKleiString());
        if (templateName !== expectedType) {
            throw new Error(`Expected to deserialize type "${expectedType}", but received "${templateName}"`);
        }
        return this.deserializeRawType(reader, templateName);
    }
    deserializeRawType(reader, typeName) {
        const template = this._templates.get(typeName);
        if (!template) {
            throw new Error(`Cannot deserialize type template "${typeName}": Template does not exist.`);
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
    serialize(writer, typeName, value) {
        const template = this._templates.get(typeName);
        if (!template) {
            throw new Error(`Cannot serialize type template "${typeName}": Template does not exist.`);
        }
        writer.writeKleiString(typeName);
        this.serializeRawType(writer, typeName, value);
    }
    serializeRawType(writer, typeName, value) {
        const template = this._templates.get(typeName);
        if (!template) {
            throw new Error(`Cannot serialize type template "${typeName}": Template does not exist.`);
        }
        for (let field of template.fields) {
            this._serializeType(writer, field, value[field.typeName]);
        }
        for (let prop of template.properties) {
            this._serializeType(writer, prop, value[prop.typeName]);
        }
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
            const typeName = validateMemberName(reader.readKleiString());
            this._logger.trace(`Parsing field "${typeName}".`);
            fields[i] = Object.assign({ typeName }, readType(reader));
        }
        this._logger.trace("All fields parsed.");
        const properties = [];
        for (let i = 0; i < propCount; i++) {
            const typeName = validateMemberName(reader.readKleiString());
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
    _writeTemplate(writer, template) {
        writer.writeInt32(template.fields.length);
        writer.writeInt32(template.properties.length);
        for (let field of template.fields) {
            writer.writeKleiString(field.typeName);
            writeType(writer, field);
        }
        for (let prop of template.properties) {
            writer.writeKleiString(prop.typeName);
            writeType(writer, prop);
        }
    }
    _deserializeType(reader, descriptor) {
        const { typeInfo, subTypes, templateName } = descriptor;
        switch (typeInfo) {
            case interfaces_1.TypeInfo.UserDefined: {
                if (!templateName) {
                    throw new Error(`Expected user-defined type to have a template name, but none was defined.`);
                }
                // First value indicates the size of the written data.
                //  ONI writes the size, but only checks if >= 0
                if (reader.readInt32() >= 0) {
                    return this.deserializeRawType(reader, templateName);
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
                return reader.readUInt32();
            case interfaces_1.TypeInfo.Vector2I: {
                const vector = {
                    x: reader.readInt32(),
                    y: reader.readInt32()
                };
                return vector;
            }
            case interfaces_1.TypeInfo.Vector2: {
                const vector = {
                    x: reader.readSingle(),
                    y: reader.readSingle()
                };
                return vector;
            }
            case interfaces_1.TypeInfo.Vector3:
                return reader.readVector3();
            case interfaces_1.TypeInfo.Array:
            case interfaces_1.TypeInfo.List:
            case interfaces_1.TypeInfo.HashSet: {
                if (!subTypes || subTypes.length !== 1) {
                    throw new Error(`Expected Array | List | HashSet types to have one subtype.`);
                }
                // Stores the size of the data
                //  ONI writes this, but discards it on read.
                // ONI BUG: ONI does NOT include the count in the data length if the value is not null,
                //  but includes the length if it is null.
                reader.readInt32();
                const length = reader.readInt32();
                if (length >= 0) {
                    const subType = subTypes[0];
                    if (subType.typeInfo === interfaces_1.TypeInfo.Byte) {
                        const data = reader.readBytes(length);
                        return Array.from(new Uint8Array(data));
                    }
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
                if (!subTypes || subTypes.length !== 2) {
                    throw new Error(`Expected Pair type to have two subtypes.`);
                }
                const [type1, type2] = subTypes;
                // ONI BUG: The ONI serializer serializes a null pair as [4,-1],
                //  which seems to be a copy/paste bug from array or dictionary.
                // As such, this will always attempt to parse, even if the value is null.
                //  This will lead to Very Very Bad Things
                if (reader.readInt32() >= 0) {
                    return {
                        key: this._deserializeType(reader, type1),
                        value: this._deserializeType(reader, type2)
                    };
                }
                else {
                    return null;
                }
            }
            case interfaces_1.TypeInfo.Dictionary: {
                if (!subTypes || subTypes.length !== 2) {
                    throw new Error(`Expected Dictionary type to have two subtypes.`);
                }
                const [keyType, valueType] = subTypes;
                // Stores the size of the data
                //  ONI writes this, but discards it on read.
                reader.readInt32();
                // In contrast to UserDefined, a length of -1 means null.
                const length = reader.readInt32();
                if (length >= 0) {
                    const pairs = [];
                    // We load values first, then keys.
                    for (let i = 0; i < length; i++) {
                        pairs[i] = new Array(2);
                        pairs[i][1] = this._deserializeType(reader, valueType);
                    }
                    for (let i = 0; i < length; i++) {
                        pairs[i][0] = this._deserializeType(reader, keyType);
                    }
                    // Returning a pair array for now, so we can have idiompotency.
                    //  Trying to figure out where the save or load code is diverging.
                    return pairs;
                }
                else {
                    return null;
                }
            }
            case interfaces_1.TypeInfo.Colour: {
                const color = {
                    r: reader.readByte() / 255,
                    b: reader.readByte() / 255,
                    g: reader.readByte() / 255,
                    a: reader.readByte() / 255
                };
                return color;
            }
            default:
                throwUnknownTypeInfo(descriptor.typeInfo);
        }
    }
    _serializeType(writer, descriptor, value) {
        const { typeInfo, subTypes, templateName } = descriptor;
        switch (typeInfo) {
            case interfaces_1.TypeInfo.UserDefined: {
                if (!templateName) {
                    throw new Error(`Expected user-defined type to have a template name, but none was defined.`);
                }
                if (value == null) {
                    // Unlike the collection types, we simply store -1 for data length
                    //  when the value is null.
                    writer.writeInt32(-1);
                }
                else {
                    // TODO: ONI writes the size of the serialized data here.
                    //  We could do this like ONI does by tracking the position offset
                    //  of the writer and rewriting the value, but we currently do not
                    //  expose that functionality on the writer.
                    //  However, it is absolutely possible to do; the writer
                    //  uses an array buffer internally.
                    const dataWriter = new binary_serializer_1.ArrayDataWriter();
                    this.serializeRawType(dataWriter, templateName, value);
                    writer.writeInt32(dataWriter.position);
                    writer.writeBytes(dataWriter.getBytesView());
                }
                return;
            }
            case interfaces_1.TypeInfo.SByte:
                return writer.writeSByte(value);
            case interfaces_1.TypeInfo.Byte:
                return writer.writeByte(value);
            case interfaces_1.TypeInfo.Boolean:
                return writer.writeByte(value ? 1 : 0);
            case interfaces_1.TypeInfo.Int16:
                return writer.writeInt16(value);
            case interfaces_1.TypeInfo.UInt16:
                return writer.writeUInt16(value);
            case interfaces_1.TypeInfo.Int32:
                return writer.writeInt32(value);
            case interfaces_1.TypeInfo.UInt32:
                return writer.writeUInt32(value);
            case interfaces_1.TypeInfo.Int64:
                return writer.writeInt64(value);
            case interfaces_1.TypeInfo.UInt64:
                return writer.writeUInt64(value);
            case interfaces_1.TypeInfo.Single:
                return writer.writeSingle(value);
            case interfaces_1.TypeInfo.Double:
                return writer.writeDouble(value);
            case interfaces_1.TypeInfo.String:
                return writer.writeKleiString(value);
            case interfaces_1.TypeInfo.Enumeration:
                return writer.writeUInt32(value);
            case interfaces_1.TypeInfo.Vector2I: {
                writer.writeInt32(value.x);
                writer.writeInt32(value.y);
                return;
            }
            case interfaces_1.TypeInfo.Vector2: {
                writer.writeSingle(value.x);
                writer.writeSingle(value.y);
                return;
            }
            case interfaces_1.TypeInfo.Vector3:
                return writer.writeVector3(value);
            case interfaces_1.TypeInfo.Array:
            case interfaces_1.TypeInfo.List:
            case interfaces_1.TypeInfo.HashSet: {
                if (!subTypes || subTypes.length !== 1) {
                    throw new Error(`Expected Array | List | HashSet types to have one subtype.`);
                }
                // ONI BUG: ONI does NOT include the count in the data length if the value is not null,
                //  but includes the length if it is null.
                if (value == null) {
                    // ONI BUG: data length includes size bytes when value is null.
                    writer.writeInt32(4);
                    writer.writeInt32(-1);
                }
                else {
                    // TODO: ONI writes the size of the serialized data here.
                    //  We could do this like ONI does by tracking the position offset
                    //  of the writer and rewriting the value, but we currently do not
                    //  expose that functionality on the writer.
                    //  However, it is absolutely possible to do; the writer
                    //  uses an array buffer internally.
                    const dataWriter = new binary_serializer_1.ArrayDataWriter();
                    const array = value;
                    if (array.length >= 0) {
                        const subType = subTypes[0];
                        if (subType.typeInfo === interfaces_1.TypeInfo.Byte) {
                            dataWriter.writeBytes(new Uint8Array(array));
                        }
                        else {
                            for (let item of array) {
                                this._serializeType(dataWriter, subType, item);
                            }
                        }
                    }
                    // ONI BUG: data length does NOT include size bytes when value is not null.
                    writer.writeInt32(dataWriter.position);
                    writer.writeInt32(array.length);
                    writer.writeBytes(dataWriter.getBytesView());
                }
                return;
            }
            case interfaces_1.TypeInfo.Pair: {
                if (!subTypes || subTypes.length !== 2) {
                    throw new Error(`Expected Pair type to have two subtypes.`);
                }
                const [type1, type2] = subTypes;
                if (value == null) {
                    // ONI BUG: ONI writes out [4, -1] when pair is null,
                    //  as if they were storing a count in the second value.
                    // This is DIFFERENT than the parse logic, which checks the first value
                    //  to be greater or equal to 0 for non-null.
                    //  Nor do we, in order to stay as close to the save logic as possible.
                    writer.writeInt32(4);
                    writer.writeInt32(-1);
                }
                else {
                    this._serializeType(writer, type1, value.key);
                    this._serializeType(writer, type2, value.value);
                }
                return;
            }
            case interfaces_1.TypeInfo.Dictionary: {
                if (!subTypes || subTypes.length !== 2) {
                    throw new Error(`Expected Dictionary type to have two subtypes.`);
                }
                const [keyType, valueType] = subTypes;
                if (value == null) {
                    writer.writeInt32(4);
                    writer.writeInt32(-1);
                }
                else {
                    // TODO: ONI writes the size of the serialized data here.
                    //  We could do this like ONI does by tracking the position offset
                    //  of the writer and rewriting the value, but we currently do not
                    //  expose that functionality on the writer.
                    //  However, it is absolutely possible to do; the writer
                    //  uses an array buffer internally.
                    const dataWriter = new binary_serializer_1.ArrayDataWriter();
                    // Might consider making this an OrderedMap, so load/save is idiompotent.
                    const pairs = value;
                    // We store values first, then keys.
                    for (let pair of pairs) {
                        this._serializeType(dataWriter, valueType, pair[1]);
                    }
                    for (let pair of pairs) {
                        this._serializeType(dataWriter, keyType, pair[0]);
                    }
                    // ONI BUG: data length does NOT include size bytes when value is not null.
                    writer.writeInt32(dataWriter.position);
                    writer.writeInt32(pairs.length);
                    writer.writeBytes(dataWriter.getBytesView());
                }
                return;
            }
            case interfaces_1.TypeInfo.Colour: {
                const color = value;
                writer.writeByte(clamp(color.r * 255, 0, 255));
                writer.writeByte(clamp(color.g * 255, 0, 255));
                writer.writeByte(clamp(color.b * 255, 0, 255));
                writer.writeByte(clamp(color.a * 255, 0, 255));
                return;
            }
            default:
                throwUnknownTypeInfo(descriptor.typeInfo);
        }
    }
};
TypeTemplateRegistryImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(services_2.TypeTemplateRegistry),
    microinject_1.provides(services_2.TypeReader),
    microinject_1.provides(services_2.TypeWriter),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(services_1.Logger))
], TypeTemplateRegistryImpl);
exports.TypeTemplateRegistryImpl = TypeTemplateRegistryImpl;
function clamp(value, low, high) {
    if (value < low)
        return low;
    if (value > high)
        return high;
    return value;
}
function throwUnknownTypeInfo(typeInfo) {
    throw new Error(`Unknown type info "${typeInfo}"`);
}
function readType(reader) {
    const typeData = reader.readByte();
    const typeInfo = typeData & interfaces_1.TypeInfo.VALUE_MASK;
    const isGeneric = Boolean(typeData & interfaces_1.TypeInfo.IS_GENERIC_TYPE);
    const descriptor = {
        typeInfo,
        isGeneric
    };
    // This occurs before generic resolution, if we are a generic.
    if (typeInfo === interfaces_1.TypeInfo.UserDefined || typeInfo === interfaces_1.TypeInfo.Enumeration) {
        // The ONI code (KSerialization.DeserializationTemplate)
        //  does a lookup of the template here, so presumably it will error out
        //  if it has not been previously parsed.
        // We will skip that step for now, since we look things up dynamically.
        descriptor.templateName = validateTypeName(reader.readKleiString());
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
function writeType(writer, type) {
    const { typeInfo, templateName, isGeneric, subTypes } = type;
    let typeData = typeInfo;
    if (isGeneric) {
        // Can't trust the presense of subTypes to indicate this
        typeData |= interfaces_1.TypeInfo.IS_GENERIC_TYPE;
    }
    writer.writeByte(typeData);
    if (typeInfo === interfaces_1.TypeInfo.UserDefined || typeInfo === interfaces_1.TypeInfo.Enumeration) {
        if (!templateName || templateName.length === 0) {
            throw new Error("UserDefined or Enumeration types must supply a templateName.");
        }
        writer.writeKleiString(templateName);
    }
    if (isGeneric) {
        if (!subTypes) {
            throw new Error("Generics must have subtypes.");
        }
        // Generic types write out their subType count
        writer.writeByte(subTypes.length);
        for (let subType of subTypes) {
            writeType(writer, subType);
        }
    }
    else if (typeInfo === interfaces_1.TypeInfo.Array) {
        if (!subTypes || subTypes.length !== 1) {
            throw new Error("Array types must have exactly 1 subtype.");
        }
        // Arrays have one subtype and do NOT emit a count.
        writeType(writer, subTypes[0]);
    }
    if (subTypes) {
        if (!isGeneric && (typeInfo !== interfaces_1.TypeInfo.Array || subTypes.length !== 1)) {
            throw new Error("Invalid subtype configuration.  Subtypes can only be used for generics, or with a single type for arrays.");
        }
    }
}
/**
 * Ensures that a template name looks valid.
 * If valid, it will return the input name.
 * If invalid, it will throw.
 * @param templateName The name to validate.
 */
function validateTypeName(templateName) {
    return utils_1.validateDotNetIdentifierName(templateName);
}
/**
 * Ensures that a member name looks valid.
 * If valid, it will return the input name.
 * If invalid, it will throw.
 * @param memberName The name to validate.
 */
function validateMemberName(memberName) {
    return utils_1.validateDotNetIdentifierName(memberName);
}
//# sourceMappingURL=template-registry.js.map