import { TemplateParser } from "./templates/type-parser";
import { ParseIterator } from "../parser";
import { SaveGameData } from "../save-structure";
export declare function parseGameData({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameData>;
