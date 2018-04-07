import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { ByteTypeDescriptor } from "./descriptor";
export declare class ByteTypeSerializer implements TypeSerializationInfo<number, ByteTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: ByteTypeDescriptor): number;
    write(writer: DataWriter, descriptor: ByteTypeDescriptor, value: number): void;
}
