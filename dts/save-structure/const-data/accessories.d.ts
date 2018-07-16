export declare const ACCESSORY_ID_PREFIX = "Root.Accessories.";
export interface Accessory {
    guid: {
        /**
         * Note: Not an actual guid!  This is a string name of a nested resource,
         * such as ```Root.Accessories.eyes_003```.
         */
        Guid: string;
    };
}
export declare const AccessoryTypes: ("body" | "hat" | "hat_hair" | "hair_always" | "hair" | "headshape" | "eyes" | "mouth" | "neck" | "arm")[];
export declare type AccessoryType = typeof AccessoryTypes extends (infer R)[] ? R : never;
export declare const EyeAccessoryNames: ("eyes_001" | "eyes_002" | "eyes_003" | "eyes_004" | "eyes_005")[];
export declare const HeadshapeAccessoryNames: ("headshape_001" | "headshape_002" | "headshape_003" | "headshape_004")[];
export declare const MouthAccessoryNames: ("mouth_001" | "mouth_002" | "mouth_003" | "mouth_004")[];
export declare const HairAccessoryNames: ("hair_001" | "hair_002" | "hair_003" | "hair_004" | "hair_005" | "hair_006" | "hair_007" | "hair_008" | "hair_009" | "hair_010" | "hair_011" | "hair_012" | "hair_013" | "hair_014" | "hair_015" | "hair_016" | "hair_017" | "hair_018" | "hair_019" | "hair_020" | "hair_021" | "hair_022" | "hair_023" | "hair_027" | "hair_028" | "hair_029" | "hair_030" | "hair_031" | "hair_032" | "hair_033")[];
export declare const BodyAccessoryNames: ("body_001" | "body_002" | "body_003" | "body_004")[];
export declare const AccessoriesByType: Record<AccessoryType, string[] | null>;
export declare function Accessory(name: string): Accessory;
export declare function getIndexOfAccessoryType(accessories: Accessory[], type: AccessoryType): number;
export declare function getAccessoryType(accessory: string | Accessory): AccessoryType | null;
export declare function getAccessoryName(accessory: string | Accessory): string | null;
export declare function makeAccessoryID(name: string): string;
export declare function getAccessoryOfType(accessories: Accessory[], type: AccessoryType): Accessory | null;
