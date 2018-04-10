import { SaveGameInstance } from "./services";
export declare function parseSaveGame(data: ArrayBuffer): SaveGameInstance;
export declare function writeSaveGame(save: SaveGameInstance): ArrayBuffer;
