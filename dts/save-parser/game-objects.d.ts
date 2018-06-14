import { ParseIterator } from "../parser";
import { GameObjectGroup } from "../save-structure";
import { TemplateParser } from "./templates/type-parser";
export declare function parseGameObjects(templateParser: TemplateParser): ParseIterator<GameObjectGroup[]>;
