import { ParseIterator } from "../../parser";
import { SaveGameHeader } from "./header";
export declare function parseHeader(): ParseIterator<SaveGameHeader>;
export declare function unparseHeader(header: SaveGameHeader): IterableIterator<import("../../../../../../../../Users/william.matthews/Documents/dev-personal/oni-save-parser/src/parser/unparse/write-instructions").WriteBytesInstruction | import("../../../../../../../../Users/william.matthews/Documents/dev-personal/oni-save-parser/src/parser/unparse/write-instructions").WriteUInt32Instruction>;
