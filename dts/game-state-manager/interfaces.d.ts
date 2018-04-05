import { Vector3, Quaternion } from "../interfaces";
export interface GameObject {
    readonly position: Vector3;
    readonly rotation: Quaternion;
    readonly scale: Vector3;
    /**
     * Number from 0 to 255.
     * This is used to look up the object's unity prefab.
     */
    readonly folder: number;
    readonly behaviors: ReadonlyMap<string, GameObjectBehavior>;
}
export interface GameObjectBehavior {
    readonly parsedData: any;
    readonly extraData: ArrayBufferView | null;
}
