import { TemplateParser, TemplateUnparser } from "../type-templates/template-data-parser";
import { ParseIterator, UnparseIterator } from "../../parser";
import { SaveGameWorld } from "./world";
export declare function parseWorld({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameWorld>;
export declare function unparseWorld(world: SaveGameWorld, { unparseByTemplate }: TemplateUnparser): UnparseIterator;
