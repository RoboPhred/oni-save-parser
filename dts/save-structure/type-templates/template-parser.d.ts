import { ParseIterator, UnparseIterator } from "../../parser";
import { TypeTemplates } from "../../save-structure/type-templates";
export declare function parseTemplates(): ParseIterator<TypeTemplates>;
export declare function unparseTemplates(templates: TypeTemplates): UnparseIterator;
