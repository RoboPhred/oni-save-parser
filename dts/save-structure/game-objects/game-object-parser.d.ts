import { ParseIterator, UnparseIterator } from "../../parser";
import { TemplateParser, TemplateUnparser } from "../type-templates/template-data-parser";
import { GameObject } from "./game-objects";
export declare function parseGameObject(templateParser: TemplateParser): ParseIterator<GameObject>;
export declare function unparseGameObject(gameObject: GameObject, templateUnparser: TemplateUnparser): UnparseIterator;
