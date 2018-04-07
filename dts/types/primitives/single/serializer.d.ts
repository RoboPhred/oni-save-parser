import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { SingleTypeDescriptor } from "./descriptor";
export declare class SingleTypeSerializer implements TypeSerializationInfo<number, SingleTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: SingleTypeDescriptor): number;
    write(writer: DataWriter, descriptor: SingleTypeDescriptor, value: number): void;
}
