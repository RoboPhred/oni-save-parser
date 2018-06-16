import { GameObjectBehavior } from "../game-objects";
import { BehaviorName } from "./interfaces";
export declare type AccessoryType = "eyes" | "hair" | "headshape" | "mouth" | "body";
export declare const ACCESSORY_TYPES: AccessoryType[];
export declare const AccessorizerBehavior: BehaviorName<AccessorizerBehavior>;
export interface AccessorizerBehavior extends GameObjectBehavior {
    name: "Accessorizer";
    parsedData: {
        accessories: Accessory[];
    };
}
export interface Accessory {
    guid: {
        /**
         * Note: Not an actual guid!  This is a string name of a nested resource,
         * such as ```Root.Accessories.eyes_003```.
         */
        Guid: string;
    };
}
export declare const ACCESSORIZER_EYE_GUIDS: string[];
export declare const ACCESSORIZER_HEAD_GUIDS: string[];
export declare const ACCESSORIZER_MOUTH_GUIDS: string[];
export declare const ACCESSORIZER_HAIR_GUIDS: string[];
export declare const ACCESSORIZER_BODY_GUIDS: string[];
export declare function getIndexOfAccessoryType(accessories: Accessory[], type: AccessoryType): number;
export declare function getAccessoryType(accessoryID: string): AccessoryType | null;
export declare function getAccessoryOrdinal(accessoryID: string): number | null;
export declare function makeAccessoryID(type: AccessoryType, ordinal: number): string;
export declare function getAccessoryOfType(accessories: Accessory[], type: AccessoryType): Accessory | null;
