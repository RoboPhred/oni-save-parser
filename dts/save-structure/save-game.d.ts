import { SaveGameHeader } from "./save-header";
import { TypeTemplates } from "./type-templates";
import { SaveGameWorld } from "./world";
export interface SaveGame {
    header: SaveGameHeader;
    templates: TypeTemplates;
    world: SaveGameWorld;
}
