import { Schema } from "jsonschema";
import { ParseIterator } from "../parser";
import { DataWriter } from "../binary-serializer";
import { SaveGameHeader } from "../save-structure";
export declare const headerSchema: Schema;
export declare function parseHeader(): ParseIterator<SaveGameHeader>;
export declare function writeHeader(writer: DataWriter, header: SaveGameHeader): void;
