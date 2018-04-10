import { Identifier } from "microinject";
import { BinarySerializable } from "../../../binary-serializer";
import { SaveGame, SaveGameHeader, SaveGameInfo, SaveBody, GameSaveRoot, GameSettings, GameObject, GameSaveData } from "../interfaces";
export interface SaveGameInstance extends SaveGame, BinarySerializable {
}
export declare const SaveGameInstance: Identifier<SaveGameInstance>;
export interface SaveGameHeaderInstance extends SaveGameHeader, BinarySerializable {
}
export declare const SaveGameHeaderInstance: Identifier<SaveGameHeaderInstance>;
export interface SaveGameInfoInstance extends SaveGameInfo, BinarySerializable {
}
export declare const SaveGameInfoInstance: Identifier<SaveGameInfoInstance>;
export interface SaveBodyInstance extends SaveBody, BinarySerializable {
}
export declare const SaveBodyInstance: Identifier<SaveBodyInstance>;
export interface GameSaveRootInstance extends GameSaveRoot, BinarySerializable {
}
export declare const GameSaveRootInstance: Identifier<GameSaveRootInstance>;
export interface GameSettingsInstance extends GameSettings, BinarySerializable {
}
export declare const GameSettingsInstance: Identifier<GameSettingsInstance>;
/**
 * This is anagolous to the ONI assembly's ```SaveManager``.
 * However, we name it for what it does, because we already
 * have enough things called "save".
 * Everything else called "save" deals with the save file
 * structure, while this explicitly deals with instantiating
 * game objects.
 */
export interface GameObjectManager extends BinarySerializable {
    readonly gameObjects: Map<string, GameObject[]>;
}
export declare const GameObjectManager: Identifier<GameObjectManager>;
export interface GameSaveDataInstance extends GameSaveData, BinarySerializable {
}
export declare const GameSaveDataInstance: Identifier<GameSaveDataInstance>;
