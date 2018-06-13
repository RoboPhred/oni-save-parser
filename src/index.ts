import {
  ArrayDataReader,
  ArrayDataWriter,
  ZlibDataReader
} from "./binary-serializer";

import { SaveGame, SaveGameHeader } from "./save-structure";

import { parse } from "./parser";

import { parseHeader, writeHeader } from "./save-parser/header";
import { parseTemplates } from "./save-parser/templates/index";
import { TypeTemplates } from "./save-structure/type-templates";
import { parseByTemplate } from "./save-parser/templates/type-parser";
import { SaveGameWorld } from "./save-structure/world";
import { parseWorld } from "./save-parser/world";
import { ParseContext } from "./parse-context";

export function parseSaveGame(data: ArrayBuffer): SaveGame {
  let reader = new ArrayDataReader(data);

  const header = parse<SaveGameHeader>(reader, parseHeader());
  const templates = parse<TypeTemplates>(reader, parseTemplates());

  if (header.isCompressed) {
    reader = new ZlibDataReader(reader.viewAllBytes());
  }

  const context = makeSaveParserContext(header, templates);

  const worldMarker = reader.readKleiString();
  if (worldMarker !== "world") {
    throw new Error(`Expected "world" string.`);
  }

  const world = parse<SaveGameWorld>(reader, parseWorld(context));

  return {
    header,
    templates,
    world
  };
}

function makeSaveParserContext(
  header: SaveGameHeader,
  templates: TypeTemplates
): ParseContext {
  return {
    ...header,
    parseByTemplate: parseByTemplate.bind(null, templates)
  };
}

export function writeSaveGame(save: SaveGame): ArrayBuffer {
  const writer = new ArrayDataWriter();

  writeHeader(writer, save.header);

  return writer.getBytes();
}
