import { SaveGameHeader } from "./header";
import { TypeTemplates } from "./type-templates";
import { SaveGameWorld } from "./world";
import { SaveGameSettings } from "./settings";
import { GameObjectGroup } from "./game-objects";
import { SaveGameData } from "./game-data";

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
