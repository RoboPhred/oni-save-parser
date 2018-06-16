import { SaveGameHeader } from "./save-header";
import { TypeTemplates } from "./type-templates";
import { SaveGameWorld } from "./world";
import { SaveGameSettings } from "./save-settings";
import { GameObjectGroup } from "./game-objects";
import { SaveGameData } from "./save-game-data";
export interface SaveGame {
    header: SaveGameHeader;
    templates: TypeTemplates;
    world: SaveGameWorld;
    settings: SaveGameSettings;
    version: {
        major: number;
        minor: number;
    };
    gameObjects: GameObjectGroup[];
    gameData: SaveGameData;
}
