
import {
    inject,
    injectable,
    inScope
} from "microinject";


import {
    validateDotNetIdentifierName
} from "../../../../../utils";

import {
    ArrayDataWriter,
    DataReader,
    DataWriter
} from "../../../../../binary-serializer";

import {
    SaveGameScope
} from "../../../services";

import {
    TypeID
} from "../../interfaces";

import {
    TypeSerializationInfo,
    TypeTemplateSerializer,
    TypeTemplateRegistry
} from "../../services";

import {
    UserDefinedTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@inScope(SaveGameScope)
export class UserDefinedTypeSerializer implements TypeSerializationInfo<object | null, UserDefinedTypeDescriptor<object>> {
    readonly id = TypeID.UserDefined;
    readonly name = "user-defined";

    constructor(
        @inject(TypeTemplateRegistry) private _templateRegistry: TypeTemplateRegistry,
        @inject(TypeTemplateSerializer) private _templateSerializer: TypeTemplateSerializer
    ) { }

    parseDescriptor(reader: DataReader): UserDefinedTypeDescriptor<object> {
        const templateName = validateDotNetIdentifierName(reader.readKleiString());
        return {
            name: this.name,
            templateName
        };
    }

    writeDescriptor(writer: DataWriter, descriptor: UserDefinedTypeDescriptor<object>): void {
        writer.writeKleiString(descriptor.templateName);
    }

    parseType(reader: DataReader, descriptor: UserDefinedTypeDescriptor<object>): object | null {
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

        const obj = this._templateSerializer.parseTemplatedType(reader, templateName);

        const parseLength = reader.position - parseStart;
        if (parseLength !== dataLength) {
            throw new Error(`Failed to parse object: Template name "${templateName}" parsed ${Math.abs(parseLength - dataLength)} ${parseLength > dataLength ? "more" : "less"} than expected.`);
        }

        return obj;
    }

    writeType(writer: DataWriter, descriptor: UserDefinedTypeDescriptor<object>, value: object | null): void {
        const templateName = descriptor.templateName;
        const template = this._templateRegistry.get(templateName);
        if (!template) {
            throw new Error(`Failed to write object: Template name "${templateName}" is not in the template registry.`);
        }

        if (value == null) {
            writer.writeInt32(-1);
        }
        else {
            const dataWriter = new ArrayDataWriter();
            this._templateSerializer.writeTemplatedType(dataWriter, templateName, value);

            writer.writeInt32(dataWriter.position);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
}