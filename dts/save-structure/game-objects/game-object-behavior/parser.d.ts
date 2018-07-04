import { ParseIterator, UnparseIterator } from "../../../parser";
import { TemplateParser, TemplateUnparser } from "../../type-templates/template-data-parser";
import { GameObjectBehavior } from "./game-object-behavior";
export declare function parseGameObjectBehavior(templateParser: TemplateParser): ParseIterator<GameObjectBehavior>;
export declare function unparseGameObjectBehavior(behavior: GameObjectBehavior, templateUnparser: TemplateUnparser): UnparseIterator;
