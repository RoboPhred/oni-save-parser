import { TemplateParser, TemplateUnparser } from "./templates";
import { ParseIterator, UnparseIterator } from "../parser";
import { SaveGameWorld } from "../save-structure/world";
export declare function parseWorld({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameWorld>;
export declare function writeWorld(world: SaveGameWorld, { unparseByTemplate }: TemplateUnparser): UnparseIterator;
