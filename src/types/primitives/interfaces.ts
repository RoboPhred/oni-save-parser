
export interface Vector2 {
    x: number;
    y: number;
}

export type Vector2I = Vector2;

export interface Vector3 extends Vector2 {
    z: number;
}

export interface Quaternion extends Vector3 {
    w: number;
}

/**
 * With a 'u', to match the ONI the assembly.
 */
export interface Colour {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Pair<TKey = any, TValue = any> {
    key: TKey;
    value: TValue;
}

export type Dictionary<TKey = any, TValue = any> = Map<TKey, TValue>;