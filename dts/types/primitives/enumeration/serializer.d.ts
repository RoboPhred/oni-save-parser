import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { EnumerationTypeDescriptor } from "./descriptor";
export declare class EnumerationTypeSerializer implements TypeSerializationInfo<number, EnumerationTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: EnumerationTypeDescriptor): number;
    write(writer: DataWriter, descriptor: EnumerationTypeDescriptor, value: number): void;
}
