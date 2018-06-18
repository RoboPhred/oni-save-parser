import { Schema } from "jsonschema";
import { ParseIterator, WriteIterator } from "../parser";
import { SaveGameHeader } from "../save-structure";
export declare const headerSchema: Schema;
export declare function parseHeader(): ParseIterator<SaveGameHeader>;
export declare function writeHeader(header: SaveGameHeader): WriteIterator;
