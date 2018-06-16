import {
  ParseIterator,
  readSingle,
  WriteIterator,
  writeSingle,
  readInt32,
  writeInt32
} from "./parser";

export interface Vector2 {
  x: number;
  y: number;
}
export function* parseVector2(): ParseIterator<Vector2> {
  return {
    x: yield readSingle(),
    y: yield readSingle()
  };
}
export function* writeVector2(value: Vector2): WriteIterator {
  yield writeSingle(value.x);
  yield writeSingle(value.y);
}

export interface Vector2I {
  x: number;
  y: number;
}
export function* parseVector2I(): ParseIterator<Vector2I> {
  return {
    x: yield readInt32(),
    y: yield readInt32()
  };
}
export function* writeVector2I(value: Vector2I): WriteIterator {
  yield writeInt32(value.x);
  yield writeInt32(value.y);
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
export function* parseVector3(): ParseIterator<Vector3> {
  return {
    x: yield readSingle(),
    y: yield readSingle(),
    z: yield readSingle()
  };
}
export function* writeVector3(value: Vector3): WriteIterator {
  yield writeSingle(value.x);
  yield writeSingle(value.y);
  yield writeSingle(value.z);
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}
export function* parseQuaternion(): ParseIterator<Quaternion> {
  return {
    x: yield readSingle(),
    y: yield readSingle(),
    z: yield readSingle(),
    w: yield readSingle()
  };
}
export function* writeQuaternion(value: Quaternion): WriteIterator {
  yield writeSingle(value.x);
  yield writeSingle(value.y);
  yield writeSingle(value.z);
  yield writeSingle(value.w);
}
