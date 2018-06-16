import { ParseIterator, WriteIterator } from "../../parser";
import { TypeTemplates, TypeInfo } from "../../save-structure/type-templates";
export interface TemplateParser {
    parseByTemplate<T>(templateName: string): ParseIterator<T>;
}
export interface TemplateWriter {
    writeByTemplate<T>(templateName: string, value: T): WriteIterator;
}
export declare function parseByTemplate<T>(templates: TypeTemplates, templateName: string): ParseIterator<T>;
export declare function writeByTemplate<T>(templates: TypeTemplates, templateName: string, obj: T): WriteIterator;
export declare function parseByType(info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
export declare function writeByType(value: any, info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
