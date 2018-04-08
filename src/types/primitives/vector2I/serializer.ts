
import {
    injectable,
    singleton
} from "microinject";

import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";

import {
    TypeInfo
} from "../../interfaces";

import {
    TypeSerializationInfo
} from "../../services";


import {
    Vector2I
} from "./interfaces";

import {
    Vector2ITypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class Vector2ITypeSerializer implements TypeSerializationInfo<Vector2I, Vector2ITypeDescriptor> {
    readonly id = TypeInfo.Vector2I;
    readonly name = "vector2I";

    parseType(reader: DataReader, descriptor: Vector2ITypeDescriptor): Vector2I {
        return {
            x: reader.readInt32(),
            y: reader.readInt32()
        };
    }
    
    writeType(writer: DataWriter, descriptor: Vector2ITypeDescriptor, value: Vector2I): void {
        writer.writeInt32(value.x);
        writer.writeInt32(value.y);
    }
};