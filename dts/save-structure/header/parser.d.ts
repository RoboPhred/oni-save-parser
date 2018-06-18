import { ParseIterator, UnparseIterator } from "../../parser";
import { SaveGameHeader } from "./header";
export declare function parseHeader(): ParseIterator<SaveGameHeader>;
export declare function unparseHeader(header: SaveGameHeader): UnparseIterator;
