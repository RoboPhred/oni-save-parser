import { ParseIterator, UnparseIterator } from "../../../../../parser";
import { TemplateParser, TemplateUnparser } from "../../../../type-templates/template-data-parser";
import { ModifiersExtraData } from "./modifiers";
export declare function parseModifiersExtraData(templateParser: TemplateParser): ParseIterator<ModifiersExtraData>;
export declare function unparseModifiersExtraData(extraData: ModifiersExtraData, templateUnparser: TemplateUnparser): UnparseIterator;
