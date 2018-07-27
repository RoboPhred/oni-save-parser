import { ArrayDataReader, ArrayDataWriter } from "./binary-serializer";

import { parse, unparse, ParseInterceptor, UnparseInterceptor } from "./parser";

import { SaveGame } from "./save-structure";
import {
  parseSaveGame as saveGameParser,
  unparseSaveGame as saveGameUnparser
} from "./save-structure/parser";

export * from "./save-structure";
export * from "./save-structure/data-types";

export { progressReporter } from "./progress";
export { tagReporter } from "./tagger";

export function parseSaveGame(
  data: ArrayBuffer,
  interceptor?: ParseInterceptor
): SaveGame {
  let reader = new ArrayDataReader(data);
  const saveGame = parse<SaveGame>(reader, saveGameParser(), interceptor);
  return saveGame;
}

export function writeSaveGame(
  save: SaveGame,
  interceptor?: UnparseInterceptor
): ArrayBuffer {
  const writer = new ArrayDataWriter();
  unparse<SaveGame>(writer, saveGameUnparser(save), interceptor);
  return writer.getBytes();
}
