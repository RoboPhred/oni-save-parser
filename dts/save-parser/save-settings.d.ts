import { SaveGameSettings } from "../save-structure/save-settings";
import { ParseIterator, UnparseIterator } from "../parser";
import { TemplateParser, TemplateUnparser } from "./templates";
export declare function parseSaveSettings({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameSettings>;
export declare function writeSaveSettings(settings: SaveGameSettings, { unparseByTemplate }: TemplateUnparser): UnparseIterator;
