import { Schema } from "jsonschema";
import { ParseIterator } from "../parser";
import { SaveGameHeader } from "../save-structure";
export declare const headerSchema: Schema;
export declare function parseHeader(): ParseIterator<SaveGameHeader>;
export declare function writeHeader(header: SaveGameHeader): IterableIterator<import("../parser/write-instructions").WriteBytesInstruction | import("../parser/write-instructions").WriteUInt32Instruction>;
