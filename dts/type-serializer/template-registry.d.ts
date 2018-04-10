import { DataReader, DataWriter } from "../binary-serializer";
import { TypeTemplate } from "./interfaces";
import { TypeTemplateRegistry } from "./services";
export declare class TypeTemplateRegistryImpl implements TypeTemplateRegistry {
    private _templates;
    private _templateNameOrderings;
    private _typeDescriptorSerializer;
    has(templateName: string): boolean;
    get(templateName: string): TypeTemplate | undefined;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    private _parseTemplate(reader);
    private _writeTemplate(writer, template);
}
