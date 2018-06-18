import { ArrayDataReader, ArrayDataWriter } from "./binary-serializer";

import { parse, unparse } from "./parser";

import { SaveGame } from "./save-structure";
import {
  parseSaveGame as saveGameParser,
  unparseSaveGame as saveGameUnparser
} from "./save-structure/parser";

export * from "./save-structure";
export * from "./data-types";

export function parseSaveGame(data: ArrayBuffer): SaveGame {
  let reader = new ArrayDataReader(data);
  const saveGame = parse<SaveGame>(reader, saveGameParser());
  return saveGame;
}

export function writeSaveGame(save: SaveGame): ArrayBuffer {
  const writer = new ArrayDataWriter();
  unparse<SaveGame>(writer, saveGameUnparser(save));
  return writer.getBytes();
}
