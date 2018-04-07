
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
    Vector2I
} from "./interfaces";


export const serializationInfo: TypeSerializationInfo<Vector2I> = {
    id: TypeInfo.Vector2,
    name: "vector-2-integer",
    parse(reader: DataReader, descriptor: TypeDescriptor): Vector2I {
        return {
            x: reader.readInt32(),
            y: reader.readInt32()
        };
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: Vector2I): void {
        writer.writeInt32(value.x);
        writer.writeInt32(value.y);
    }
};