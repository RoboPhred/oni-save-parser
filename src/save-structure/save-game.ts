import { SaveGameHeader } from "./save-header";
import { TypeTemplates } from "./type-templates";
import { SaveGameWorld } from "./world";
import { SaveGameSettings } from "./save-settings";

export interface SaveGame {
  header: SaveGameHeader;
  templates: TypeTemplates;
  world: SaveGameWorld;
  settings: SaveGameSettings;
  versionMajor: number;
  versionMinor: number;
}
