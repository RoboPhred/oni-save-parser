import { TemplateParser } from "./save-parser/templates/type-parser";
import { SaveGameHeader } from "./save-structure";

export type ParseContext = TemplateParser & SaveGameHeader;
