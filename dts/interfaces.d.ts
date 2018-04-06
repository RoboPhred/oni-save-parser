export interface JsonObjectSerializable {
    toJSON(): object;
}
export interface Vector2 {
    x: number;
    y: number;
}
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
}
/**
 * With a 'u', because thats how Klei does it, and Precedent is Important.
 */
export interface Colour {
    r: number;
    g: number;
    b: number;
    a: number;
}
