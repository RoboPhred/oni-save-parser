import { ReadDataTypes, BasicReadInstruction } from "./read-instructions";
import { DataReader } from "../binary-serializer";
declare type ReadParser = (reader: DataReader, inst: BasicReadInstruction) => any;
declare type ReadParsers = Record<ReadDataTypes, ReadParser>;
declare const readParsers: ReadParsers;
export default readParsers;
