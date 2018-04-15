import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";
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
export declare const EYES: string[];
export declare const HEADS: string[];
export declare const MOUTHS: string[];
export declare const HAIRS: string[];
export declare const BODIES: string[];
export declare function getIndexOfAccessoryType(accessories: Accessory[], type: string): number;
export declare function getAccessoryType(accessoryID: string): string | null;
export declare function getAccessoryOrdinal(accessoryID: string): number | null;
export declare function makeAccessoryID(type: string, ordinal: number): string;
export declare function getAccessoryOfType(accessories: Accessory[], type: string): Accessory | null;
