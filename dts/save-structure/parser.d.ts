import { ParseIterator, UnparseIterator } from "../parser";
import { SaveGame } from "./save-game";
export declare function parseSaveGame(): ParseIterator<SaveGame>;
export declare function unparseSaveGame(saveGame: SaveGame): UnparseIterator;
