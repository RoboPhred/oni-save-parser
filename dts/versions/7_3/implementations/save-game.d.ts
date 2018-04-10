import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateRegistry } from "../type-serializer";
import { SaveGameInstance, SaveGameHeaderInstance, SaveBodyInstance } from "../services";
import { SaveGameHeader, SaveBody } from "../interfaces";
export declare class SaveGameInstanceImpl implements SaveGameInstance {
    private _header;
    private _templates;
    private _body;
    constructor(_header: SaveGameHeaderInstance, _templates: TypeTemplateRegistry, _body: SaveBodyInstance);
    readonly header: SaveGameHeader;
    readonly body: SaveBody;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
}
