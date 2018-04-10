import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameSettingsInstance } from "../services";
import { GameSettings } from "..";
export declare class GameSettingsInstanceImpl implements GameSettingsInstance {
    private _templateSerializer;
    private _data;
    constructor(_templateSerializer: TypeTemplateSerializer);
    readonly baseAlreadyCreated: boolean;
    readonly nextUniqueID: number;
    readonly gameID: number;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    fromJSON(value: any): void;
    toJSON(): GameSettings;
}
