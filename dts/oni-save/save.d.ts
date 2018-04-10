import { DataReader, DataWriter } from "../binary-serializer";
import { TypeTemplateRegistry } from "../type-serializer";
import { OniSaveHeader } from "../save-header";
import { OniSaveBody } from "../save-body";
import { OniSave } from "./services";
export declare class OniSaveImpl implements OniSave {
    header: OniSaveHeader;
    private _templates;
    body: OniSaveBody;
    constructor(header: OniSaveHeader, _templates: TypeTemplateRegistry, body: OniSaveBody);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {
        header: object;
        body: object;
    };
}
