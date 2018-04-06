import { JsonObjectSerializable, Quaternion, Vector3 } from "../interfaces";
export interface GameObject extends JsonObjectSerializable {
    readonly position: Vector3;
    readonly rotation: Quaternion;
    readonly scale: Vector3;
    /**
     * Number from 0 to 255.
     * This is used to look up the object's unity prefab.
     */
    readonly folder: number;
    /**
     * Behaviors for this game object.
     * The order may matter to ONI; needs more investigation.
     */
    readonly behaviors: GameObjectBehavior[];
}
export interface GameObjectBehavior {
    readonly name: string;
    readonly hasParseData: boolean;
    readonly parsedData: any;
    readonly extraData: ArrayBuffer | null;
}
