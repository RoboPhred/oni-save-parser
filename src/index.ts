import { ArrayDataReader, ArrayDataWriter } from "./binary-serializer";

import { SaveGame, SaveGameHeader } from "./save-structure";

import { parse } from "./parser";

import { parseHeader, writeHeader } from "./save-parser/header";
import { parseTemplates } from "./save-parser/templates";

export function parseSaveGame(data: ArrayBuffer): SaveGame {
  const reader = new ArrayDataReader(data);

  const header = parse<SaveGameHeader>(reader, parseHeader());
  const templates = parseTemplates(reader);

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
