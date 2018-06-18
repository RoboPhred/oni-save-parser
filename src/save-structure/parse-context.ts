import {
  TemplateParser,
  TemplateUnparser
} from "./type-templates/template-data-parser";

import { SaveGameHeader } from "./header";

export type ParseContext = TemplateParser & SaveGameHeader;
export type WriteContext = TemplateUnparser & SaveGameHeader;
