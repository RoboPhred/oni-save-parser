import { GameObjectBehavior } from "../game-objects";
import { BehaviorName } from "./interfaces";
export declare const MinionResumeBehavior: BehaviorName<MinionResumeBehavior>;
export interface MinionResumeBehavior extends GameObjectBehavior {
    name: "MinionResume";
    templateData: {
        ExperienceByRoleID?: [string, number][];
        MasteryByRoleID?: [string, boolean][];
        AptitudeByRoleGroup?: [{
            hash: number;
        }, number][];
        currentRole?: string;
        targetRole?: string;
    };
}
export declare const APTITUDE_NAME_HASHES: {
    Farming: number;
    Ranching: number;
    Mining: number;
    Cooking: number;
    Art: number;
    Building: number;
    Management: number;
    Research: number;
    Suits: number;
    Hauling: number;
    Technicals: number;
    MedicalAid: number;
    Basekeeping: number;
};
export declare type AptitudeName = keyof typeof APTITUDE_NAME_HASHES;
export declare const APTITUDE_NAMES: ("MedicalAid" | "Farming" | "Ranching" | "Mining" | "Cooking" | "Art" | "Building" | "Management" | "Research" | "Suits" | "Hauling" | "Technicals" | "Basekeeping")[];
export declare const APTITUDE_HASH_NAMES: {
    [key: number]: AptitudeName;
};
