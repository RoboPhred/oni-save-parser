import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameSettingsInstance } from "../services";
export declare class GameSettingsInstanceImpl implements GameSettingsInstance {
    private _templateSerializer;
    private _settings;
    constructor(_templateSerializer: TypeTemplateSerializer);
    readonly baseAlreadyCreated: boolean;
    readonly nextUniqueID: number;
    readonly gameID: number;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
}
