import { Schema } from "jsonschema";
import { DataWriter } from "../binary-serializer";
import { SaveGameHeader } from "../save-structure";
export declare const headerSchema: Schema;
export declare function parseHeader(): IterableIterator<SaveGameHeader | import("../parser/read-instructions").ReadBytesInstruction | import("../parser/read-instructions").ReadUInt32Instruction>;
export declare function writeHeader(writer: DataWriter, header: SaveGameHeader): void;
