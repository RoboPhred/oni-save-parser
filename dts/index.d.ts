import { ParseInterceptor, UnparseInterceptor } from "./parser";
import { SaveGame } from "./save-structure";
import { SaveGameParserOptions } from "./save-structure/parser";
export * from "./save-structure";
export * from "./save-structure/data-types";
export * from "./binary-serializer/types";
export { progressReporter } from "./progress";
export { tagReporter } from "./tagger";
export { E_VERSION_MAJOR, E_VERSION_MINOR } from "./save-structure/version-validator";
export interface ParseOptions extends SaveGameParserOptions {
    interceptor?: ParseInterceptor;
}
export declare function parseSaveGame(data: ArrayBuffer, interceptor?: ParseInterceptor): SaveGame;
export declare function parseSaveGame(data: ArrayBuffer, options?: ParseOptions): SaveGame;
export declare function writeSaveGame(save: SaveGame, interceptor?: UnparseInterceptor): ArrayBuffer;
