import { ParseIterator, UnparseIterator } from "../../parser";
import { TemplateParser, TemplateUnparser } from "../type-templates/template-data-parser";
import { GameObjectGroup } from "./game-object-group";
export declare function parseGameObjects(templateParser: TemplateParser): ParseIterator<GameObjectGroup[]>;
export declare function unparseGameObjects(lists: GameObjectGroup[], templateWriter: TemplateUnparser): UnparseIterator;
