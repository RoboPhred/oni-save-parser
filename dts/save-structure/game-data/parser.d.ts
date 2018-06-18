import { ParseIterator, UnparseIterator } from "../../parser";
import { TemplateParser, TemplateUnparser } from "../type-templates/template-data-parser";
import { SaveGameData } from "./game-data";
export declare function parseGameData({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameData>;
export declare function writeGameData(gameData: SaveGameData, { unparseByTemplate }: TemplateUnparser): UnparseIterator;
