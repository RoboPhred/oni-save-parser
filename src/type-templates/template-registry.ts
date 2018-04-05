
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
    DataReader
} from "../data-reader";

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
    TypeDeserializer,
    TypeTemplateRegistry
} from "./services";


@injectable()
@provides(TypeTemplateRegistry)
@provides(TypeDeserializer)
@inScope(OniSave)
export class TypeTemplateRegistryImpl implements TypeTemplateRegistry, TypeDeserializer, JsonObjectSerializable {

    private _templates = new Map<string, TypeTemplate>();

    constructor(
        @inject(Logger) private _logger: Logger
    ) { }

    parse(reader: DataReader): void {
        this._logger.trace("Parsing type templates.");

        const templateCount = reader.readInt32();
        this._logger.trace(`${templateCount} templates found.`);
        for (let i = 0; i < templateCount; i++) {
            const templateName = validateTypeName(reader.readKleiString());

            this._logger.trace(`Parsing template "${templateName}".`);

            const template = this._parseTemplate(reader);

            this._logger.trace(`Done parsing template "${templateName}".`);

            this._templates.set(templateName, template);
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

        return this.deserializeType(reader, templateName);
    }

    deserializeType<T>(reader: DataReader, typeName: AssemblyTypeName<T>): T {
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
                // First value seems to indicate nullability.
                if (reader.readInt32() >= 0) {
                    return this.deserializeType(reader, templateName);
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
                return reader.readUInt32();
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

                // Always read and discarded.
                //  No idea what this is, its variable
                //  seems to be optimized out in the ONI assembly.
                reader.readInt32();
                const length = reader.readInt32();
                if (length >= 0) {
                    const subType = subTypes[0];
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
                return {
                    key: this._deserializeType(reader, type1),
                    value: this._deserializeType(reader, type2)
                };
            }
            case TypeInfo.Dictionary: {
                if (!subTypes || subTypes.length !== 2) {
                    throw new Error(`Expected Dictionary type to have two subtypes.`);
                }

                const [keyType, valueType] = subTypes;

                // Again, read and discarded.
                //  Similar to TypeInfo.Array
                reader.readInt32();
                const length = reader.readInt32();
                if (length > 0) {
                    const pairs: [any, any][] = [];

                    // We load values first, then keys.
                    for (let i = 0; i < length; i++) {
                        pairs[i] = new Array(2) as [any, any];
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
}

function throwUnknownTypeInfo(typeInfo: TypeInfo): never {
    throw new Error(`Unknown type info "${typeInfo}"`);
}

function readType(reader: DataReader): TypeDescriptor {
    const typeData = reader.readByte() as TypeInfo;

    const typeInfo = typeData & TypeInfo.VALUE_MASK;
    const isGeneric = Boolean(typeData & TypeInfo.IS_GENERIC_TYPE);

    const descriptor: TypeDescriptor = {
        typeInfo
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