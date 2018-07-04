import { ParseIterator, UnparseIterator } from "../../../../../parser";
import { TemplateParser, TemplateUnparser } from "../../../../type-templates/template-data-parser";
import { StoredGameObject } from "./storage";
export declare function parseStorageExtraData(templateParser: TemplateParser): ParseIterator<StoredGameObject[]>;
export declare function unparseStorageExtraData(extraData: StoredGameObject[], templateUnparser: TemplateUnparser): UnparseIterator;
