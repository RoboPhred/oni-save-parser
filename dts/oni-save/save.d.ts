import { JsonObjectSerializable } from "../interfaces";
import { DataReader } from "../data-reader";
import { TypeTemplateRegistry } from "../type-templates";
import { OniSaveHeader } from "../save-header";
import { OniSaveBody } from "../save-body";
import { OniSave } from "./services";
export declare class OniSaveImpl implements OniSave, JsonObjectSerializable {
    header: OniSaveHeader;
    private _templates;
    body: OniSaveBody;
    constructor(header: OniSaveHeader, _templates: TypeTemplateRegistry, body: OniSaveBody);
    parse(reader: DataReader): void;
    toJSON(): {
        header: object;
        body: object;
    };
}
