import { ParseIterator, UnparseIterator } from "../../../parser";
import { TemplateParser, TemplateUnparser } from "../../type-templates/template-data-parser";
import { GameObjectGroup } from "./game-object-group";
export declare function parseGameObjectGroup(templateParser: TemplateParser): ParseIterator<GameObjectGroup>;
export declare function unparseGameObjectGroup(group: GameObjectGroup, templateUnparser: TemplateUnparser): UnparseIterator;
