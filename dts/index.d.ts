import { ParseInterceptor, UnparseInterceptor } from "./parser";
import { SaveGame } from "./save-structure";
export * from "./save-structure";
export * from "./save-structure/data-types";
export * from "./binary-serializer/types";
export { progressReporter } from "./progress";
export { tagReporter } from "./tagger";
export declare function parseSaveGame(data: ArrayBuffer, interceptor?: ParseInterceptor): SaveGame;
export declare function writeSaveGame(save: SaveGame, interceptor?: UnparseInterceptor): ArrayBuffer;
