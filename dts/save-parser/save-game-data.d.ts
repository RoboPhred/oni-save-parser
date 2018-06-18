import { TemplateParser, TemplateUnparser } from "./templates";
import { ParseIterator, UnparseIterator } from "../parser";
import { SaveGameData } from "../save-structure";
export declare function parseGameData({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameData>;
export declare function writeGameData(gameData: SaveGameData, { unparseByTemplate }: TemplateUnparser): UnparseIterator;
