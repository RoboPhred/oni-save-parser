import { SaveGame } from "./save-structure";
export * from "./save-structure";
export * from "./data-types";
export declare function parseSaveGame(data: ArrayBuffer): SaveGame;
export declare function writeSaveGame(save: SaveGame): ArrayBuffer;
