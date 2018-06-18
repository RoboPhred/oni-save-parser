import { ParseIterator, UnparseIterator } from "./parser";
export interface Vector2 {
    x: number;
    y: number;
}
export declare function parseVector2(): ParseIterator<Vector2>;
export declare function unparseVector2(value: Vector2): UnparseIterator;
export interface Vector2I {
    x: number;
    y: number;
}
export declare function parseVector2I(): ParseIterator<Vector2I>;
export declare function unparseVector2I(value: Vector2I): UnparseIterator;
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export declare function parseVector3(): ParseIterator<Vector3>;
export declare function unparseVector3(value: Vector3): UnparseIterator;
export interface Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
}
export declare function parseQuaternion(): ParseIterator<Quaternion>;
export declare function unparseQuaternion(value: Quaternion): UnparseIterator;
