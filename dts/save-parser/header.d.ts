import { Schema } from "jsonschema";
import { DataWriter } from "../binary-serializer";
import { SaveGameHeader } from "../save-structure";
export declare const headerSchema: Schema;
export declare function parseHeader(): IterableIterator<import("../parser/read-instructions").ReadBytesInstruction | import("../parser/read-instructions").ReadUInt32Instruction | {
    buildVersion: any;
    headerVersion: any;
    isCompressed: boolean;
    gameInfo: any;
}>;
export declare function writeHeader(writer: DataWriter, header: SaveGameHeader): void;
