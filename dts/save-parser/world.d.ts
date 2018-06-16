import { TemplateParser, TemplateWriter } from "./templates/type-parser";
import { ParseIterator, WriteIterator } from "../parser";
import { SaveGameWorld } from "../save-structure/world";
export declare function parseWorld({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameWorld>;
export declare function writeWorld(world: SaveGameWorld, { writeByTemplate }: TemplateWriter): WriteIterator;
