import { SaveGameSettings } from "../save-structure/save-settings";
import { ParseIterator, WriteIterator } from "../parser";
import { TemplateParser, TemplateWriter } from "./templates/type-parser";
export declare function parseSaveSettings({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameSettings>;
export declare function writeSaveSettings(settings: SaveGameSettings, { writeByTemplate }: TemplateWriter): WriteIterator;
