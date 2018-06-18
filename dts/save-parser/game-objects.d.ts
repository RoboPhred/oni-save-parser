import { ParseIterator, UnparseIterator } from "../parser";
import { GameObjectGroup } from "../save-structure";
import { TemplateParser, TemplateUnparser } from "./templates";
export declare function parseGameObjects(templateParser: TemplateParser): ParseIterator<GameObjectGroup[]>;
export declare function unparseGameObjects(groups: GameObjectGroup[], templateWriter: TemplateUnparser): UnparseIterator;
