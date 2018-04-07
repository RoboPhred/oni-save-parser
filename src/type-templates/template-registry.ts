
import {
    inject,
    injectable,
    inScope,
    provides
} from "microinject"

import {
    Colour,
    JsonObjectSerializable,
    Vector2
} from "../interfaces";

import {
    validateDotNetIdentifierName
} from "../utils";

import {
    Logger
} from "../logging/services";

import {
    DataReader,
    DataWriter,
    ArrayDataWriter
} from "../binary-serializer";

import {
    OniSave
} from "../oni-save";

import {
    AssemblyTypeName
} from "../assembly-types";

import {
    TypeDescriptor,
    TypeInfo,
    TypeTemplate,
    NamedTypeDescriptor
} from "./interfaces";

import {
    TypeReader,
    TypeTemplateRegistry,
    TypeWriter
} from "./services";


@injectable()
@provides(TypeTemplateRegistry)
@provides(TypeReader)
@provides(TypeWriter)
@inScope(OniSave)
export class TypeTemplateRegistryImpl implements TypeTemplateRegistry {

    private _templates = new Map<string, TypeTemplate>();
    private _orderedTemplateNames: string[] = [];

    constructor(
        @inject(Logger) private _logger: Logger
    ) { }

    parse(reader: DataReader): void {
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

    write(writer: DataWriter): void {
        writer.writeInt32(this._orderedTemplateNames.length);

        // ONI checks existence of sub-templates while parsing templates,
        //  so we should ensure the order we write them back in is the same
        //  as we read them.
        for (let templateName of this._orderedTemplateNames) {
            const template = this._templates.get(templateName)!;
            writer.writeKleiString(templateName);
            this._writeTemplate(writer, template);
        }
    }

    hasType(typeName: string): boolean {
        return this._templates.has(typeName);
    }

    deserialize<T>(reader: DataReader, expectedType?: AssemblyTypeName<T>): T {
        const templateName = validateTypeName(reader.readKleiString());

        if (templateName !== expectedType) {
            throw new Error(`Expected to deserialize type "${expectedType}", but received "${templateName}"`);
        }

        return this.deserializeRawType(reader, templateName);
    }

    deserializeRawType<T>(reader: DataReader, typeName: AssemblyTypeName<T>): T {
        const template = this._templates.get(typeName);
        if (!template) {
            throw new Error(`Cannot deserialize type template "${typeName}": Template does not exist.`);
        }

        const obj: any = {};

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

    serialize<T = any>(writer: DataWriter, typeName: AssemblyTypeName<T>, value: T): void {
        const template = this._templates.get(typeName);
        if (!template) {
            throw new Error(`Cannot serialize type template "${typeName}": Template does not exist.`);
        }

        writer.writeKleiString(typeName);
        this.serializeRawType(writer, typeName, value);
    }

    serializeRawType<T = any>(writer: DataWriter, typeName: AssemblyTypeName<T>, value: T): void {
        const template = this._templates.get(typeName);
        if (!template) {
            throw new Error(`Cannot serialize type template "${typeName}": Template does not exist.`);
        }

        for (let field of template.fields) {
            this._serializeType(writer, field, (value as any)[field.typeName]);
        }

        for (let prop of template.properties) {
            this._serializeType(writer, prop, (value as any)[prop.typeName]);
        }
    }

    toJSON(): object {
        const templates: { [key: string]: TypeTemplate } = {};

        for (let entry of this._templates.entries()) {
            templates[entry[0]] = entry[1];
        }

        return {
            templates
        };
    }

    private _parseTemplate(reader: DataReader): TypeTemplate {
        const fieldCount = reader.readInt32();
        const propCount = reader.readInt32();

        this._logger.trace(`Template has ${fieldCount} fields and ${propCount} properties.`);

        const fields: NamedTypeDescriptor[] = [];
        for (let i = 0; i < fieldCount; i++) {
            const typeName = validateMemberName(reader.readKleiString());
            this._logger.trace(`Parsing field "${typeName}".`);
            fields[i] = {
                typeName,
                ...readType(reader)
            };
        }

        this._logger.trace("All fields parsed.");

        const properties: NamedTypeDescriptor[] = [];
        for (let i = 0; i < propCount; i++) {
            const typeName = validateMemberName(reader.readKleiString());
            this._logger.trace(`Parsing property "${typeName}".`);
            properties[i] = {
                typeName,
                ...readType(reader)
            };
        }

        this._logger.trace("All properties parsed.");

        const template: TypeTemplate = {
            fields,
            properties
        };

        return template;
    }

    private _writeTemplate(writer: DataWriter, template: TypeTemplate): void {
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

    private _deserializeType(reader: DataReader, descriptor: TypeDescriptor): any {
        const {
            typeInfo,
            subTypes,
            templateName
        } = descriptor;

        switch (typeInfo) {
            case TypeInfo.UserDefined: {
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
            case TypeInfo.SByte:
                return reader.readSByte();
            case TypeInfo.Byte:
                return reader.readByte();
            case TypeInfo.Boolean:
                return reader.readByte() == 1;
            case TypeInfo.Int16:
                return reader.readInt16();
            case TypeInfo.UInt16:
                return reader.readUInt16();
            case TypeInfo.Int32:
                return reader.readInt32();
            case TypeInfo.UInt32:
                return reader.readUInt32();
            case TypeInfo.Int64:
                return reader.readInt64();
            case TypeInfo.UInt64:
                return reader.readUInt64();
            case TypeInfo.Single:
                return reader.readSingle();
            case TypeInfo.Double:
                return reader.readDouble();
            case TypeInfo.String:
                return reader.readKleiString();
            case TypeInfo.Enumeration:
                return reader.readInt32();
            case TypeInfo.Vector2I: {
                const vector: Vector2 = {
                    x: reader.readInt32(),
                    y: reader.readInt32()
                };
                return vector;
            }
            case TypeInfo.Vector2: {
                const vector: Vector2 = {
                    x: reader.readSingle(),
                    y: reader.readSingle()
                };
                return vector;
            }
            case TypeInfo.Vector3:
                return reader.readVector3();
            case TypeInfo.Array:
            case TypeInfo.List:
            case TypeInfo.HashSet: {
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

                    if (subType.typeInfo === TypeInfo.Byte) {
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
            case TypeInfo.Pair: {
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
            case TypeInfo.Dictionary: {
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
                    const pairs: [any, any][] = [];

                    // We load values first, then keys.
                    for (let i = 0; i < length; i++) {
                        pairs[i] = new Array(2) as [any, any];
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
            case TypeInfo.Colour: {
                const color: Colour = {
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

    private _serializeType(writer: DataWriter, descriptor: TypeDescriptor, value: any) {
        const {
            typeInfo,
            subTypes,
            templateName
        } = descriptor;

        switch (typeInfo) {
            case TypeInfo.UserDefined: {
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
                    const dataWriter = new ArrayDataWriter();
                    this.serializeRawType(dataWriter, templateName, value);
                    writer.writeInt32(dataWriter.position);
                    writer.writeBytes(dataWriter.getBytesView());
                }
                return;
            }
            case TypeInfo.SByte:
                return writer.writeSByte(value);
            case TypeInfo.Byte:
                return writer.writeByte(value);
            case TypeInfo.Boolean:
                return writer.writeByte(value ? 1 : 0);
            case TypeInfo.Int16:
                return writer.writeInt16(value);
            case TypeInfo.UInt16:
                return writer.writeUInt16(value);
            case TypeInfo.Int32:
                return writer.writeInt32(value);
            case TypeInfo.UInt32:
                return writer.writeUInt32(value);
            case TypeInfo.Int64:
                return writer.writeInt64(value);
            case TypeInfo.UInt64:
                return writer.writeUInt64(value);
            case TypeInfo.Single:
                return writer.writeSingle(value);
            case TypeInfo.Double:
                return writer.writeDouble(value);
            case TypeInfo.String:
                return writer.writeKleiString(value);
            case TypeInfo.Enumeration:
                return writer.writeInt32(value);
            case TypeInfo.Vector2I: {
                writer.writeInt32(value.x);
                writer.writeInt32(value.y);
                return;
            }
            case TypeInfo.Vector2: {
                writer.writeSingle(value.x);
                writer.writeSingle(value.y);
                return;
            }
            case TypeInfo.Vector3:
                return writer.writeVector3(value);
            case TypeInfo.Array:
            case TypeInfo.List:
            case TypeInfo.HashSet: {
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
                    const dataWriter = new ArrayDataWriter();

                    const array = value as any[];
                    if (array.length >= 0) {
                        const subType = subTypes[0];

                        if (subType.typeInfo === TypeInfo.Byte) {
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
            case TypeInfo.Pair: {
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
            case TypeInfo.Dictionary: {
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
                    const dataWriter = new ArrayDataWriter();

                    // Might consider making this an OrderedMap, so load/save is idiompotent.
                    const pairs = value as [any, any][];
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
            case TypeInfo.Colour: {
                const color = value as Colour;
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
}

function clamp(value: number, low: number, high: number): number {
    if (value < low) return low;
    if (value > high) return high;
    return value;
}

function throwUnknownTypeInfo(typeInfo: TypeInfo): never {
    throw new Error(`Unknown type info "${typeInfo}"`);
}

function readType(reader: DataReader): TypeDescriptor {
    const typeData = reader.readByte() as TypeInfo;

    const typeInfo = typeData & TypeInfo.VALUE_MASK;
    const isGeneric = Boolean(typeData & TypeInfo.IS_GENERIC_TYPE);

    const descriptor: TypeDescriptor = {
        typeInfo,
        isGeneric
    };

    // This occurs before generic resolution, if we are a generic.
    if (typeInfo === TypeInfo.UserDefined || typeInfo === TypeInfo.Enumeration) {
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
    else if (typeInfo === TypeInfo.Array) {
        // There is special code for handling arrays.
        //  Apparently, they are never generic but always specify a type.
        descriptor.subTypes = [
            readType(reader)
        ];
    }

    return descriptor;
}

function writeType(writer: DataWriter, type: TypeDescriptor) {
    const {
        typeInfo,
        templateName,
        isGeneric,
        subTypes
    } = type;

    let typeData = typeInfo;

    if (isGeneric) {
        // Can't trust the presense of subTypes to indicate this
        typeData |= TypeInfo.IS_GENERIC_TYPE;
    }

    writer.writeByte(typeData);

    if (typeInfo === TypeInfo.UserDefined || typeInfo === TypeInfo.Enumeration) {
        if (!templateName || templateName.length === 0) {
            throw new Error("UserDefined or Enumeration types must supply a templateName.");
        }
        writer.writeKleiString(templateName)
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
    else if (typeInfo === TypeInfo.Array) {
        if (!subTypes || subTypes.length !== 1) {
            throw new Error("Array types must have exactly 1 subtype.");
        }
        // Arrays have one subtype and do NOT emit a count.
        writeType(writer, subTypes[0]);
    }

    if (subTypes) {
        if (!isGeneric && (typeInfo !== TypeInfo.Array || subTypes.length !== 1)) {
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
function validateTypeName(templateName: string | null | undefined): string {
    return validateDotNetIdentifierName(templateName);
}

/**
 * Ensures that a member name looks valid.
 * If valid, it will return the input name.
 * If invalid, it will throw.
 * @param memberName The name to validate.
 */
function validateMemberName(memberName: string | null | undefined): string {
    return validateDotNetIdentifierName(memberName);
}