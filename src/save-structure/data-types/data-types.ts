export interface Vector2 {
  x: number;
  y: number;
}

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

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}
