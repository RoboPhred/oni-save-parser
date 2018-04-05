import { DataReader } from "../data-reader";
import { TypeDeserializer } from "../type-templates";
import { OniGameSettings } from "./services";
export declare class OniGameSettingsImpl implements OniGameSettings {
    private _deserializer;
    private _baseAlreadyCreated;
    private _nextUniqueID;
    private _gameID;
    constructor(_deserializer: TypeDeserializer);
    readonly baseAlreadyCreated: boolean;
    readonly nextUniqueID: number;
    readonly gameID: number;
    parse(reader: DataReader): void;
    toJSON(): {
        baseAlreadyCreated: boolean;
        nextUniqueID: number;
        gameID: number;
    };
}
