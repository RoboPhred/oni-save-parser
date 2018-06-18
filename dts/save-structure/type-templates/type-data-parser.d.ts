import { ParseIterator } from "../../parser";
import { TypeTemplates, TypeInfo } from "../../save-structure/type-templates";
export declare function parseByType(info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
export declare function unparseByType(value: any, info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
