import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeSerializationInfo, TypeSerializer, TypeDescriptorSerializer, TypeTemplateRegistry } from "../../services";
import { UserDefinedGenericTypeDescriptor } from "./descriptor";
export declare class UserDefinedGenericTypeSerializer implements TypeSerializationInfo<object | null, UserDefinedGenericTypeDescriptor<object>> {
    private _templateRegistry;
    private _descriptorSerializer;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_templateRegistry: TypeTemplateRegistry, _descriptorSerializer: TypeDescriptorSerializer, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): UserDefinedGenericTypeDescriptor<object>;
    writeDescriptor(writer: DataWriter, descriptor: UserDefinedGenericTypeDescriptor<object>): void;
    parseType(reader: DataReader, descriptor: UserDefinedGenericTypeDescriptor<object>): object | null;
    writeType(writer: DataWriter, descriptor: UserDefinedGenericTypeDescriptor<object>, value: object | null): void;
}
