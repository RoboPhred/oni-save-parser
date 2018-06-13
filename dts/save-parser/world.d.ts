import { TemplateParser } from "./templates/type-parser";
import { ParseIterator } from "../parser";
import { SaveGameWorld } from "../save-structure/world";
export declare function parseWorld({ parseByTemplate }: TemplateParser): ParseIterator<SaveGameWorld>;
