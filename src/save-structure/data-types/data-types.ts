export interface Vector2 {
  x: number;
  y: number;
}
export const vec2_zero: Readonly<Vector2> = Object.freeze({ x: 0, y: 0 });

export interface Vector2I {
  x: number;
  y: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
export const vec3_zero: Readonly<Vector3> = Object.freeze({ x: 0, y: 0, z: 0 });
export const vec3_one: Readonly<Vector3> = Object.freeze({ x: 1, y: 1, z: 1 });

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}
export const quat_zero: Readonly<Quaternion> = Object.freeze({
  x: 0,
  y: 0,
  z: 0,
  w: 0
});
export const quat_default: Readonly<Quaternion> = Object.freeze({
  x: 0,
  y: 0,
  z: 0,
  w: 1
});
