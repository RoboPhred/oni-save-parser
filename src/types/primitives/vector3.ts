
import {
    DataReader,
    DataWriter
} from "../../binary-serializer";

import {
    TypeDescriptor,
    TypeInfo,
    TypeSerializationInfo
} from "../interfaces";

import {
    Vector3
} from "./interfaces";


export const serializationInfo: TypeSerializationInfo<Vector3> = {
    id: TypeInfo.Vector3,
    name: "vector-3",
    parse(reader: DataReader, descriptor: TypeDescriptor): Vector3 {
        return {
            x: reader.readSingle(),
            y: reader.readSingle(),
            z: reader.readSingle()
        };
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: Vector3): void {
        writer.writeSingle(value.x);
        writer.writeSingle(value.y);
        writer.writeSingle(value.z);
    }
};