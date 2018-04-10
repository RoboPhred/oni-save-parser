import { DataReader, DataWriter } from "../binary-serializer";
import { TypeSerializer } from "../type-serializer";
import { OniGameSettings } from "./services";
export declare class OniGameSettingsImpl implements OniGameSettings {
    private _typeSerializer;
    private _settings;
    constructor(_typeSerializer: TypeSerializer);
    readonly baseAlreadyCreated: boolean;
    readonly nextUniqueID: number;
    readonly gameID: number;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {
        baseAlreadyCreated: boolean;
        nextUniqueID: number;
        gameID: number;
    };
}
