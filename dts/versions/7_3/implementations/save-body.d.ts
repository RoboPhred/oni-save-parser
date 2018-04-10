import { DataReader, DataWriter } from "../../../binary-serializer";
import { SaveBodyInstance, SaveGameHeaderInstance, GameSaveRootInstance, GameSettingsInstance, GameObjectManager, GameSaveDataInstance } from "../services";
import { GameSaveRoot, GameSettings, GameObject, GameSaveData } from "../interfaces";
export declare class SaveBodyInstanceImpl implements SaveBodyInstance {
    private _header;
    private _saveRoot;
    private _gameSettings;
    private _gameObjectManager;
    private _gameData;
    constructor(_header: SaveGameHeaderInstance, _saveRoot: GameSaveRootInstance, _gameSettings: GameSettingsInstance, _gameObjectManager: GameObjectManager, _gameData: GameSaveDataInstance);
    readonly saveRoot: GameSaveRoot;
    readonly gameSettings: GameSettings;
    readonly gameObjects: Map<string, GameObject[]>;
    readonly gameData: GameSaveData;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    private _parseState(reader);
    private _writeState(writer);
}
