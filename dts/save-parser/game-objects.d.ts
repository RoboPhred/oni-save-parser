import { ParseIterator, WriteIterator } from "../parser";
import { GameObjectGroup } from "../save-structure";
import { TemplateParser, TemplateWriter } from "./templates/type-parser";
export declare function parseGameObjects(templateParser: TemplateParser): ParseIterator<GameObjectGroup[]>;
export declare function writeGameObjects(groups: GameObjectGroup[], templateWriter: TemplateWriter): WriteIterator;
