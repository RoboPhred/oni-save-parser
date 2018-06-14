import { ReadDataTypes, ReadInstruction } from "./read-instructions";
import { DataReader } from "../binary-serializer";
declare type TypedReadInstruction<T extends ReadDataTypes> = Extract<ReadInstruction, {
    dataType: T;
}>;
declare type ReadParser<T extends ReadDataTypes> = (reader: DataReader, inst: TypedReadInstruction<T>) => any;
declare type ReadParsers = {
    [P in ReadDataTypes]: ReadParser<P>;
};
declare const readParsers: ReadParsers;
export default readParsers;
export declare function executeReadInstruction<T extends ReadDataTypes>(reader: DataReader, inst: TypedReadInstruction<T>): any;
