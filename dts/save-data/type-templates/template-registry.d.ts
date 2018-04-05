import { JsonObjectSerializable } from "../../interfaces";
import { DataReader } from "../../data-reader";
import { TypeTemplateRegistry } from "./interfaces";
export declare class TypeTemplateRegistryImpl implements TypeTemplateRegistry, JsonObjectSerializable {
    private _templates;
    parseTemplates(reader: DataReader): void;
    toJSON(): object;
    private _parseTemplate(reader);
}
