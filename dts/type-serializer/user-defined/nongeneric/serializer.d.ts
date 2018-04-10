import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeID } from "../../interfaces";
import { TypeSerializationInfo, TypeSerializer, TypeTemplateRegistry } from "../../services";
import { UserDefinedTypeDescriptor } from "./descriptor";
export declare class UserDefinedTypeSerializer implements TypeSerializationInfo<object | null, UserDefinedTypeDescriptor<object>> {
    private _templateRegistry;
    private _typeSerializer;
    readonly id: TypeID;
    readonly name: string;
    constructor(_templateRegistry: TypeTemplateRegistry, _typeSerializer: TypeSerializer);
    parseDescriptor(reader: DataReader): UserDefinedTypeDescriptor<object>;
    writeDescriptor(writer: DataWriter, descriptor: UserDefinedTypeDescriptor<object>): void;
    parseType(reader: DataReader, descriptor: UserDefinedTypeDescriptor<object>): object | null;
    writeType(writer: DataWriter, descriptor: UserDefinedTypeDescriptor<object>, value: object | null): void;
}
