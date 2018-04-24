import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";
export declare const GeyserBehavior: BehaviorName<GeyserBehavior>;
export interface GeyserBehavior extends GameObjectBehavior {
    name: "Geyser";
    parsedData: {
        configuration?: {
            typeId: {
                hash: number;
            };
            rateRoll: number;
            iterationLengthRoll: number;
            iterationPercentRoll: number;
            yearLengthRoll: number;
            yearPercentRoll: number;
        };
    };
}
export declare const GEYSER_TYPE_NAME_HASHES: {
    "steam": number;
    "hot_steam": number;
    "hot_water": number;
    "slush_water": number;
    "filthy_water": number;
    "small_volcano": number;
    "big_volcano": number;
    "liquid_co2": number;
    "hot_co2": number;
    "hot_hydrogen": number;
    "hot_po2": number;
    "slimy_po2": number;
    "chlorine_gas": number;
    "methane": number;
    "molten_copper": number;
    "molten_iron": number;
    "molten_gold": number;
    "oil_drip": number;
};
export declare type GeyserTypeName = keyof typeof GEYSER_TYPE_NAME_HASHES;
export declare const GEYSER_TYPE_NAMES: ("steam" | "hot_steam" | "hot_water" | "slush_water" | "filthy_water" | "small_volcano" | "big_volcano" | "liquid_co2" | "hot_co2" | "hot_hydrogen" | "hot_po2" | "slimy_po2" | "chlorine_gas" | "methane" | "molten_copper" | "molten_iron" | "molten_gold" | "oil_drip")[];
export declare const GEYSER_TYPE_HASH_NAMES: {
    [key: number]: GeyserTypeName;
};
export declare function getGeyserTypeName(hash: number): string | undefined;
export declare function getGeyserTypeHash(name: string): number | undefined;
