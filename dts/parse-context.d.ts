import { TemplateParser, TemplateUnparser } from "./save-parser/templates";
import { SaveGameHeader } from "./save-structure";
export declare type ParseContext = TemplateParser & SaveGameHeader;
export declare type WriteContext = TemplateUnparser & SaveGameHeader;
