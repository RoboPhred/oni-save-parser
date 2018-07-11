export interface Accessory {
    guid: {
        /**
         * Note: Not an actual guid!  This is a string name of a nested resource,
         * such as ```Root.Accessories.eyes_003```.
         */
        Guid: string;
    };
}
export declare const ACCESSORY_TYPES: ("body" | "eyes" | "hair" | "headshape" | "mouth" | "neck" | "arm" | "hat")[];
export declare type AccessoryType = ArrayValues<typeof ACCESSORY_TYPES>;
export declare const ACCESSORY_EYE_ORDINALS: number[];
export declare const ACCESSORY_HEAD_ORDINALS: number[];
export declare const ACCESSORY_MOUTH_ORDINALS: number[];
export declare const ACCESSORY_HAIR_ORDINALS: number[];
export declare const ACCESSORY_BODY_ORDINALS: number[];
export declare function Accessory(str: string): Accessory;
export declare function Accessory(type: AccessoryType, ordinal: number): Accessory;
export declare function getIndexOfAccessoryType(accessories: Accessory[], type: AccessoryType): number;
export declare function getAccessoryType(accessory: string | Accessory): AccessoryType | null;
export declare function getAccessoryOrdinal(accessory: string | Accessory): number | null;
export declare function makeAccessory(type: AccessoryType, ordinal: number): Accessory;
export declare function makeAccessoryID(type: AccessoryType, ordinal: number): string;
export declare function getAccessoryOfType(accessories: Accessory[], type: AccessoryType): Accessory | null;
