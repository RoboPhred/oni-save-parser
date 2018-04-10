
import {
    Vector2I
} from "../../../../../interfaces";

import {
    TypeDescriptor,
    TypeID
} from "../../interfaces";

import {
    TypeSerializationInfo
} from "../../services";

import {
    createSimpleSerializationInfo
} from "../simple-serializer";

import {
    Vector2ITypeDescriptor
} from "./descriptor";


export const Vector2ITypeSerializer = createSimpleSerializationInfo<Vector2I, Vector2ITypeDescriptor>(
    TypeID.Vector2I,
    "vector2I",
    reader => ({
        x: reader.readInt32(),
        y: reader.readInt32(),
    }),
    (writer, value) => {
        writer.writeInt32(value.x)
        writer.writeInt32(value.y)
    }
);
