import { SaveGameHeader } from "./save-header";
import { TypeTemplateDictionary } from "./type-templates";

export interface SaveGame {
  header: SaveGameHeader;
  templates: TypeTemplateDictionary;
}
