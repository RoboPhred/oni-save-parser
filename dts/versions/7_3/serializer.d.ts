import { SaveGame } from "./interfaces";
export declare function parseSaveGame(data: ArrayBuffer): SaveGame;
export declare function writeSaveGame(save: SaveGame): ArrayBuffer;
