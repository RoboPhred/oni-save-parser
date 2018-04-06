import { DataReader, DataWriter } from "../binary-serializer";
import { TypeReader, TypeWriter } from "../type-templates";
import { OniGameSettings } from "./services";
export declare class OniGameSettingsImpl implements OniGameSettings {
    private _typeReader;
    private _typeWriter;
    private _settings;
    constructor(_typeReader: TypeReader, _typeWriter: TypeWriter);
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
