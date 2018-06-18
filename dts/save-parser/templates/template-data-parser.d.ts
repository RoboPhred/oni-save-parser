import { ParseIterator, UnparseIterator } from "../../parser";
import { TypeTemplates } from "../../save-structure/type-templates";
export interface TemplateParser {
    parseByTemplate<T>(templateName: string): ParseIterator<T>;
}
export interface TemplateUnparser {
    unparseByTemplate<T>(templateName: string, value: T): UnparseIterator;
}
export declare function parseByTemplate<T>(templates: TypeTemplates, templateName: string): ParseIterator<T>;
export declare function unparseByTemplate<T>(templates: TypeTemplates, templateName: string, obj: T): UnparseIterator;
