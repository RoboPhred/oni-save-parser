import { ContainerModule } from "microinject";
import { SaveGame } from "./interfaces";
export declare function parseSaveGame(data: ArrayBuffer, injectModule?: ContainerModule): SaveGame;
export declare function writeSaveGame(save: SaveGame, injectModule?: ContainerModule): ArrayBuffer;
