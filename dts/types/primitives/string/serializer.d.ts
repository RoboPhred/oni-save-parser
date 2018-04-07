import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { StringTypeDescriptor } from "./descriptor";
export declare class StringTypeSerializer implements TypeSerializationInfo<string | null, StringTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: StringTypeDescriptor): string | null;
    write(writer: DataWriter, descriptor: StringTypeDescriptor, value: string | null): void;
}
