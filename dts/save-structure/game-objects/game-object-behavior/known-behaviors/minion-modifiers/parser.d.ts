import { ParseIterator, UnparseIterator } from "../../../../../parser";
import { TemplateParser, TemplateUnparser } from "../../../../type-templates/template-data-parser";
import { MinionModifiersExtraData } from "./minion-modifiers";
export declare function parseMinionModifiersExtraData(templateParser: TemplateParser): ParseIterator<MinionModifiersExtraData>;
export declare function unparseMinionModifiersExtraData(extraData: MinionModifiersExtraData, templateUnparser: TemplateUnparser): UnparseIterator;
