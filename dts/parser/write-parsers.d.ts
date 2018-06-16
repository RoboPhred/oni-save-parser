import { WriteDataTypes, WriteInstruction } from "./write-instructions";
import { DataWriter } from "../binary-serializer";
declare type TypedWriteInstruction<T extends WriteDataTypes> = Extract<WriteInstruction, {
    dataType: T;
}>;
declare type WriteParser<T extends WriteDataTypes> = (writer: DataWriter, inst: TypedWriteInstruction<T>) => any;
declare type WriteParsers = {
    [P in WriteDataTypes]: WriteParser<P>;
};
declare const writeParsers: WriteParsers;
export default writeParsers;
export declare function executeWriteInstruction<T extends WriteDataTypes>(writer: DataWriter, inst: TypedWriteInstruction<T>): any;
