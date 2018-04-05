import { JsonObjectSerializable } from "../interfaces";
import { Logger } from "../logging/services";
import { DataReader } from "../data-reader";
import { AssemblyTypeName } from "../assembly-types";
import { TypeDeserializer, TypeTemplateRegistry } from "./services";
export declare class TypeTemplateRegistryImpl implements TypeTemplateRegistry, TypeDeserializer, JsonObjectSerializable {
    private _logger;
    private _templates;
    constructor(_logger: Logger);
    parse(reader: DataReader): void;
    hasType(typeName: string): boolean;
    deserialize<T>(reader: DataReader, expectedType?: AssemblyTypeName<T>): T;
    deserializeType<T>(reader: DataReader, typeName: AssemblyTypeName<T>): T;
    toJSON(): object;
    private _parseTemplate(reader);
    private _deserializeType(reader, descriptor);
}
