import { SaveGameHeader } from "./save-header";
import { TypeTemplates } from "./type-templates";

export interface SaveGame {
  header: SaveGameHeader;
  templates: TypeTemplates;
}
