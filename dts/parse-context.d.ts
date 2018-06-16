import { TemplateParser, TemplateWriter } from "./save-parser/templates/type-parser";
import { SaveGameHeader } from "./save-structure";
export declare type ParseContext = TemplateParser & SaveGameHeader;
export declare type WriteContext = TemplateWriter & SaveGameHeader;
