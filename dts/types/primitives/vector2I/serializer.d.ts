import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { Vector2I } from "./interfaces";
import { Vector2ITypeDescriptor } from "./descriptor";
export declare class Vector2ITypeSerializer implements TypeSerializationInfo<Vector2I, Vector2ITypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: Vector2ITypeDescriptor): Vector2I;
    write(writer: DataWriter, descriptor: Vector2ITypeDescriptor, value: Vector2I): void;
}
