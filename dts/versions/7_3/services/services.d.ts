import { Identifier } from "microinject";
import { BinarySerializable } from "../../../binary-serializer";
import { JsonSerializable } from "../../../json-serializer";
import { SaveGame, SaveGameHeader, SaveGameInfo, SaveBody, GameSaveRoot, GameSettings, GameObjectPrefabs, GameSaveData } from "../interfaces";
export interface SaveGameInstance extends SaveGame, BinarySerializable, JsonSerializable<SaveGame> {
}
export declare const SaveGameInstance: Identifier<SaveGameInstance>;
export interface SaveGameHeaderInstance extends SaveGameHeader, BinarySerializable, JsonSerializable<SaveGameHeader> {
}
export declare const SaveGameHeaderInstance: Identifier<SaveGameHeaderInstance>;
export interface SaveGameInfoInstance extends SaveGameInfo, BinarySerializable, JsonSerializable<SaveGameInfo> {
}
export declare const SaveGameInfoInstance: Identifier<SaveGameInfoInstance>;
export interface SaveBodyInstance extends SaveBody, BinarySerializable, JsonSerializable<SaveBody> {
}
export declare const SaveBodyInstance: Identifier<SaveBodyInstance>;
export interface GameSaveRootInstance extends GameSaveRoot, BinarySerializable, JsonSerializable<GameSaveRoot> {
}
export declare const GameSaveRootInstance: Identifier<GameSaveRootInstance>;
export interface GameSettingsInstance extends GameSettings, BinarySerializable, JsonSerializable<GameSettings> {
}
export declare const GameSettingsInstance: Identifier<GameSettingsInstance>;
/**
 * This is anagolous to the ONI assembly's ```SaveManager``.
 * However, we name it for what it does, because we already
 * have enough things called "save".
 * Everything else called "save" deals with the save file
 * structure, while this explicitly deals with game object data.
 */
export interface GameObjectManager extends BinarySerializable {
    readonly gameObjects: GameObjectPrefabs;
    fromJSON(gameObjects: GameObjectPrefabs): void;
    toJSON(): GameObjectPrefabs;
}
export declare const GameObjectManager: Identifier<GameObjectManager>;
export interface GameSaveDataInstance extends GameSaveData, BinarySerializable, JsonSerializable<GameSaveData> {
}
export declare const GameSaveDataInstance: Identifier<GameSaveDataInstance>;
