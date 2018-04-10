
import {
    Vector2
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
    Vector2TypeDescriptor
} from "./descriptor";


export const Vector2TypeSerializer = createSimpleSerializationInfo<Vector2, Vector2TypeDescriptor>(
    TypeID.Vector2,
    "vector2",
    reader => ({
        x: reader.readSingle(),
        y: reader.readSingle(),
    }),
    (writer, value) => {
        writer.writeSingle(value.x)
        writer.writeSingle(value.y)
    }
);
