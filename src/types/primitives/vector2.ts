
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
    Vector2
} from "./interfaces";


export const serializationInfo: TypeSerializationInfo<Vector2> = {
    id: TypeInfo.Vector2I,
    name: "vector-2",
    parse(reader: DataReader, descriptor: TypeDescriptor): Vector2 {
        return {
            x: reader.readSingle(),
            y: reader.readSingle()
        };
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: Vector2): void {
        writer.writeSingle(value.x);
        writer.writeSingle(value.y);
    }
};