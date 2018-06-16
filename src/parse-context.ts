import {
  TemplateParser,
  TemplateWriter
} from "./save-parser/templates/type-parser";
import { SaveGameHeader } from "./save-structure";

export type ParseContext = TemplateParser & SaveGameHeader;
export type WriteContext = TemplateWriter & SaveGameHeader;
