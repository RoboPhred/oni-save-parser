import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { EnumerationTypeDescriptor } from "./descriptor";
export declare class EnumerationTypeSerializer implements TypeSerializationInfo<number, EnumerationTypeDescriptor> {
    readonly id: TypeID;
    readonly name: string;
    parseDescriptor(reader: DataReader): EnumerationTypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: EnumerationTypeDescriptor): void;
    parseType(reader: DataReader, descriptor: EnumerationTypeDescriptor): number;
    writeType(writer: DataWriter, descriptor: EnumerationTypeDescriptor, value: number): void;
}
