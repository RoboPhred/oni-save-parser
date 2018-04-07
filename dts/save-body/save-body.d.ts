import { DataReader, DataWriter } from "../binary-serializer";
import { OniSaveBody } from "./services";
import { OniSaveHeader } from "../save-header";
import { OniSaveRoot } from "../save-root";
import { OniGameSettings } from "../game-settings";
import { OniGameState } from "../game-state";
import { OniGameData } from "../game-data";
export declare class OniSaveBodyImpl implements OniSaveBody {
    private _header;
    saveRoot: OniSaveRoot;
    gameSettings: OniGameSettings;
    gameState: OniGameState;
    gameData: OniGameData;
    constructor(_header: OniSaveHeader, saveRoot: OniSaveRoot, gameSettings: OniGameSettings, gameState: OniGameState, gameData: OniGameData);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {
        saveRoot: object;
        gameSettings: object;
        gameState: object;
        gameData: object;
    };
    private _parseState(reader);
    private _writeState(writer);
}
