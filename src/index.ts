import { ArrayDataReader, ArrayDataWriter } from "./binary-serializer";

import { SaveGame, SaveGameHeader } from "./save-structure";

import { parse, ParseIterator } from "./parser";

import { parseHeader, writeHeader } from "./save-parser/header";
import { parseTemplates } from "./save-parser/templates";
import { TypeTemplates } from "./save-structure/type-templates";

export function parseSaveGame(data: ArrayBuffer): SaveGame {
  const reader = new ArrayDataReader(data);
  function parseNext<T>(parser: ParseIterator<T>): T {
    return parse<T>(reader, parser);
  }

  const header = parseNext<SaveGameHeader>(parseHeader());
  const templates = parseNext<TypeTemplates>(parseTemplates());

  return {
    header,
    templates
  };
}

export function writeSaveGame(save: SaveGame): ArrayBuffer {
  const writer = new ArrayDataWriter();

  writeHeader(writer, save.header);

  return writer.getBytes();
}
