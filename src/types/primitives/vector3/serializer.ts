
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
    Vector3
} from "./interfaces";

import {
    Vector3TypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class Vector2TypeSerializer implements TypeSerializationInfo<Vector3, Vector3TypeDescriptor> {
    readonly id = TypeInfo.Vector3;
    readonly name = "vector3";

    parse(reader: DataReader, descriptor: Vector3TypeDescriptor): Vector3 {
        return {
            x: reader.readSingle(),
            y: reader.readSingle(),
            z: reader.readSingle()
        };
    }

    write(writer: DataWriter, descriptor: Vector3TypeDescriptor, value: Vector3): void {
        writer.writeSingle(value.x);
        writer.writeSingle(value.y);
        writer.writeSingle(value.z);
    }
};
