
import {
    injectable,
    inject,
    singleton
} from "microinject";


import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    validateDotNetIdentifierName
} from "../utils";

import {
    TypeTemplate,
    TypeTemplateMember
} from "./interfaces";

import {
    TypeTemplateRegistry,
    TypeDescriptorSerializer
} from "./services";


@injectable(TypeTemplateRegistry)
@singleton()
export class TypeTemplateRegistryImpl implements TypeTemplateRegistry {
    private _templates = new Map<string, TypeTemplate>();
    private _templateNameOrderings: string[] = [];

    @inject(TypeDescriptorSerializer)
    private _typeDescriptorSerializer: TypeDescriptorSerializer | undefined;

    has(templateName: string): boolean {
        return this._templates.has(templateName);
    }

    get(templateName: string): TypeTemplate | undefined {
        return this._templates.get(templateName);
    }

    parse(reader: DataReader): void {
        const templateCount = reader.readInt32();
        this._templateNameOrderings = new Array(templateCount);
        for(let i = 0; i < templateCount; i++) {
            const name = validateDotNetIdentifierName(reader.readKleiString());
            if (this._templates.has(name)) {
                throw new Error(`Failed to parse type template: A template named "${name}" already exists.`);
            }

            const template = this._parseTemplate(reader);
            this._templates.set(name, template);
            this._templateNameOrderings[i] = name;
        }
    }

    write(writer: DataWriter): void {
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

    private _parseTemplate(reader: DataReader): TypeTemplate {
        const fieldCount = reader.readInt32();
        const propCount = reader.readInt32();

        const fields: TypeTemplateMember[] = new Array(fieldCount);
        for(let i = 0; i < fieldCount; i++) {
            const name = validateDotNetIdentifierName(reader.readKleiString());
            const type = this._typeDescriptorSerializer!.parseDescriptor(reader);
            fields[i] = {
                name,
                type
            };
        }

        const properties: TypeTemplateMember[] = new Array(propCount);
        for(let i = 0; i < propCount; i++) {
            const name = validateDotNetIdentifierName(reader.readKleiString());
            const type = this._typeDescriptorSerializer!.parseDescriptor(reader);
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

    private _writeTemplate(writer: DataWriter, template: TypeTemplate) {
        const {
            fields,
            properties
        } = template;

        writer.writeInt32(fields.length);
        writer.writeInt32(properties.length);

        for(let field of fields) {
            const {
                name,
                type
            } = field;
            writer.writeKleiString(name);
            this._typeDescriptorSerializer!.writeDescriptor(writer, type);
        }

        for(let property of properties) {
            const {
                name,
                type
            } = property;
            writer.writeKleiString(name);
            this._typeDescriptorSerializer!.writeDescriptor(writer, type);
        }
    }
}