import { SaveGameSettings } from "../save-structure/save-settings";
import { ParseIterator } from "../parser";
import { TemplateParser } from "./templates/type-parser";
export declare function parseSaveSettings({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameSettings>;
