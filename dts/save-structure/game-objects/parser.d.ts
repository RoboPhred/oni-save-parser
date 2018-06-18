import { ParseIterator, UnparseIterator } from "../../parser";
import { TemplateParser, TemplateUnparser } from "../type-templates/template-data-parser";
import { GameObjectGroup } from "./game-objects";
export declare function parseGameObjects(templateParser: TemplateParser): ParseIterator<GameObjectGroup[]>;
export declare function unparseGameObjects(groups: GameObjectGroup[], templateWriter: TemplateUnparser): UnparseIterator;
