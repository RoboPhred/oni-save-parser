import { ArrayDataReader, ArrayDataWriter } from "./binary-serializer";

import { SaveGame } from "./save-structure";

import { parseHeader, writeHeader } from "./save-parser/header";
import { parseTemplates } from "./save-parser/templates";

export function parseSaveGame(data: ArrayBuffer): SaveGame {
  const reader = new ArrayDataReader(data);

  const header = parseHeader(reader);
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
