import { DataReader, DataWriter } from "../binary-serializer";
import { OniSaveBody } from "./services";
import { OniSaveHeader } from "../save-header";
import { OniSaveRoot } from "../save-root";
import { OniGameSettings } from "../game-settings";
import { OniGameState } from "../game-state";
export declare class OniSaveBodyImpl implements OniSaveBody {
    private _header;
    saveRoot: OniSaveRoot;
    gameSettings: OniGameSettings;
    gameState: OniGameState;
    constructor(_header: OniSaveHeader, saveRoot: OniSaveRoot, gameSettings: OniGameSettings, gameState: OniGameState);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {
        saveRoot: object;
        gameSettings: object;
        gameState: object;
    };
    private _parseState(reader);
    private _writeState(writer);
}
