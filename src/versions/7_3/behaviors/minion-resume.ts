import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";
import { getSDBMHash32 } from "..";

export const MinionResumeBehavior: BehaviorName<MinionResumeBehavior> = "MinionResume";
export interface MinionResumeBehavior extends GameObjectBehavior {
    name: "MinionResume";
    parsedData: {
        ExperienceByRoleID?: Map<string, number>;
        MasteryByRoleID?: Map<string, boolean>;
        AptitudeByRoleGroup?: Map<{hash: number}, number>;

        currentRole?: string;
        targetRole?: string;
    };
}

export const APTITUDE_NAME_HASHES = {
    "Farming": (null as any) as number,
    "Ranching": (null as any) as number,
    "Mining": (null as any) as number,
    "Cooking": (null as any) as number,
    "Art": (null as any) as number,
    "Building": (null as any) as number,
    "Management": (null as any) as number,
    "Research": (null as any) as number,
    "Suits": (null as any) as number,
    "Hauling": (null as any) as number,
    "Technicals": (null as any) as number,
    "MedicalAid": (null as any) as number,
    "Basekeeping": (null as any) as number
};
export type AptitudeName = keyof typeof APTITUDE_NAME_HASHES;
export const APTITUDE_NAMES = Object.keys(APTITUDE_NAME_HASHES) as AptitudeName[];

export const APTITUDE_HASH_NAMES: {[key: number]: AptitudeName} = {};

for (let name of APTITUDE_NAMES) {
    const hash = getSDBMHash32(name.toLowerCase());
    APTITUDE_HASH_NAMES[hash] = name;
    APTITUDE_NAME_HASHES[name] = hash;
}
