import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplate } from "./interfaces";
import { TypeTemplateRegistry, TypeTemplateSerializer } from "./services";
export declare class TypeTemplateRegistryImpl implements TypeTemplateRegistry, TypeTemplateSerializer {
    private _templates;
    private _templateNameOrderings;
    private _typeDescriptorSerializer;
    private _typeSerializer;
    has(templateName: string): boolean;
    get(templateName: string): TypeTemplate | undefined;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    fromJSON(value: TypeTemplate[]): void;
    toJSON(): TypeTemplate[];
    parseTemplatedType<T extends object = any>(reader: DataReader, templateName: string): T;
    writeTemplatedType<T extends object = any>(writer: DataWriter, templateName: string, value: T): void;
    private _parseTemplate(name, reader);
    private _writeTemplate(writer, template);
}
