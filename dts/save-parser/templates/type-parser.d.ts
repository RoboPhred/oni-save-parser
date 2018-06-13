import { ParseIterator } from "../../parser";
import { TypeTemplates, TypeInfo } from "../../save-structure/type-templates";
export interface TemplateParser {
    parseByTemplate<T>(templateName: string): ParseIterator<T>;
}
export declare function parseByTemplate<T>(templates: TypeTemplates, templateName: string): ParseIterator<T>;
export declare function parseByType(info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
