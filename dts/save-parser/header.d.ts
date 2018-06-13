import { Schema } from "jsonschema";
import { DataReader, DataWriter } from "../binary-serializer";
import { SaveGameHeader } from "../save-structure";
export declare const headerSchema: Schema;
export declare function parseHeader(reader: DataReader): SaveGameHeader;
export declare function writeHeader(writer: DataWriter, header: SaveGameHeader): void;
