import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { Vector2 } from "./interfaces";
import { Vector2TypeDescriptor } from "./descriptor";
export declare class Vector2TypeSerializer implements TypeSerializationInfo<Vector2, Vector2TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: Vector2TypeDescriptor): Vector2;
    write(writer: DataWriter, descriptor: Vector2TypeDescriptor, value: Vector2): void;
}
