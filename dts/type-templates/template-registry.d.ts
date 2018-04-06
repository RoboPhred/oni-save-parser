import { Logger } from "../logging/services";
import { DataReader, DataWriter } from "../binary-serializer";
import { AssemblyTypeName } from "../assembly-types";
import { TypeTemplateRegistry } from "./services";
export declare class TypeTemplateRegistryImpl implements TypeTemplateRegistry {
    private _logger;
    private _templates;
    private _orderedTemplateNames;
    constructor(_logger: Logger);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    hasType(typeName: string): boolean;
    deserialize<T>(reader: DataReader, expectedType?: AssemblyTypeName<T>): T;
    deserializeRawType<T>(reader: DataReader, typeName: AssemblyTypeName<T>): T;
    serialize<T = any>(writer: DataWriter, typeName: AssemblyTypeName<T>, value: T): void;
    serializeRawType<T = any>(writer: DataWriter, typeName: AssemblyTypeName<T>, value: T): void;
    toJSON(): object;
    private _parseTemplate(reader);
    private _writeTemplate(writer, template);
    private _deserializeType(reader, descriptor);
    private _serializeType(writer, descriptor, value);
}
