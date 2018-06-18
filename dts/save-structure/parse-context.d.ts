import { TemplateParser, TemplateUnparser } from "./type-templates/template-data-parser";
import { SaveGameHeader } from "./header";
export declare type ParseContext = TemplateParser & SaveGameHeader;
export declare type WriteContext = TemplateUnparser & SaveGameHeader;
