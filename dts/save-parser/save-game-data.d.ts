import { TemplateParser, TemplateWriter } from "./templates/type-parser";
import { ParseIterator, WriteIterator } from "../parser";
import { SaveGameData } from "../save-structure";
export declare function parseGameData({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameData>;
export declare function writeGameData(gameData: SaveGameData, { writeByTemplate }: TemplateWriter): WriteIterator;
