import { TypeTemplates } from "../../save-structure/type-templates";
import { ParseIterator, WriteIterator } from "../../parser";
export declare function parseTemplates(): ParseIterator<TypeTemplates>;
export declare function writeTemplates(templates: TypeTemplates): WriteIterator;
