import { TemplateParser, TemplateUnparser } from "./save-parser/templates";
import { SaveGameHeader } from "./save-structure";

export type ParseContext = TemplateParser & SaveGameHeader;
export type WriteContext = TemplateUnparser & SaveGameHeader;
