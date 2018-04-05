import { Logger } from "../logging/services";
import { JsonObjectSerializable } from "../interfaces";
import { DataReader } from "../data-reader";
import { TypeDeserializer, TypeTemplateRegistry } from "./services";
export declare class TypeTemplateRegistryImpl implements TypeTemplateRegistry, TypeDeserializer, JsonObjectSerializable {
    private _logger;
    private _templates;
    constructor(_logger: Logger);
    parse(reader: DataReader): void;
    deserialize(reader: DataReader, templateName?: string): object;
    toJSON(): object;
    private _parseTemplate(reader);
    private _deserializeType(reader, descriptor);
}
