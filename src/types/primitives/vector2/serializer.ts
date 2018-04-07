
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
    Vector2
} from "./interfaces";

import {
    Vector2TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class Vector2TypeSerializer implements TypeSerializationInfo<Vector2, Vector2TypeDescriptor> {
    readonly id = TypeInfo.Vector2;
    readonly name = "vector2";

    parse(reader: DataReader, descriptor: Vector2TypeDescriptor): Vector2 {
        return {
            x: reader.readSingle(),
            y: reader.readSingle()
        };
    }

    write(writer: DataWriter, descriptor: Vector2TypeDescriptor, value: Vector2): void {
        writer.writeSingle(value.x);
        writer.writeSingle(value.y);
    }
};