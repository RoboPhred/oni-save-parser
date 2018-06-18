import { ParseIterator, UnparseIterator } from "../../parser";
import { TemplateParser, TemplateUnparser } from "../type-templates/template-data-parser";
import { SaveGameSettings } from "./settings";
export declare function parseSettings({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameSettings>;
export declare function unparseSettings(settings: SaveGameSettings, { unparseByTemplate }: TemplateUnparser): UnparseIterator;
