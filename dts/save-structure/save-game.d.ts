import { SaveGameHeader } from "./save-header";
import { TypeTemplates } from "./type-templates";
import { SaveGameWorld } from "./world";
import { SaveGameSettings } from "./save-settings";
import { GameObjectGroup } from "./game-objects";
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
}
