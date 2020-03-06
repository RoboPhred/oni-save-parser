import { ParseIterator, UnparseIterator } from "../parser";
import { SaveGame } from "./save-game";
export interface SaveGameParserOptions {
    /**
     * How strict the parser should be in ensuring the correct save file version is used.
     * - "minor": Require the major and minor version to match.  This is the safest option.
     * - "major": Allow unknown minor versions as long as the major version matches.
     * - "none": Disable version checking.  This can result in corrupt data.
     */
    versionStrictness?: "none" | "major" | "minor";
}
export declare function parseSaveGame(options?: SaveGameParserOptions): ParseIterator<SaveGame>;
export declare function unparseSaveGame(saveGame: SaveGame): UnparseIterator;
