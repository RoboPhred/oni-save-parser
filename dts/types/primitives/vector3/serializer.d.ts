import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { Vector3 } from "./interfaces";
import { Vector3TypeDescriptor } from "./descriptor";
export declare class Vector2TypeSerializer implements TypeSerializationInfo<Vector3, Vector3TypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: Vector3TypeDescriptor): Vector3;
    write(writer: DataWriter, descriptor: Vector3TypeDescriptor, value: Vector3): void;
}
