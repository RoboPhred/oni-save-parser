import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { BooleanTypeDescriptor } from "./descriptor";
export declare class BooleanTypeSerializer implements TypeSerializationInfo<boolean, BooleanTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: BooleanTypeDescriptor): boolean;
    write(writer: DataWriter, descriptor: BooleanTypeDescriptor, value: boolean): void;
}
