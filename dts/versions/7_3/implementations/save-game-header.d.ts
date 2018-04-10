import { DataReader, DataWriter } from "../../../binary-serializer";
import { SaveGameHeaderInstance } from "../services";
import { SaveGameInfo, SaveGameHeader } from "../interfaces";
export declare class SaveGameHeaderInstanceImpl implements SaveGameHeaderInstance {
    private _buildVersion;
    private _headerVersion;
    private _isCompressed;
    private _gameInfo;
    readonly buildVersion: number;
    readonly headerVersion: number;
    readonly isCompressed: boolean;
    readonly gameInfo: SaveGameInfo;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    fromJSON(value: SaveGameHeader): void;
    toJSON(): {
        buildVersion: number;
        headerVersion: number;
        isCompressed: boolean;
        gameInfo: SaveGameInfo;
    };
}
