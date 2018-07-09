import { HashedString } from "../../data-types";
export declare const MinionRoleNames: {
    Farming: "Farming";
    Ranching: "Ranching";
    Mining: "Mining";
    Cooking: "Cooking";
    Art: "Art";
    Building: "Building";
    Management: "Management";
    Research: "Research";
    Suits: "Suits";
    Hauling: "Hauling";
    Technicals: "Technicals";
    MedicalAid: "MedicalAid";
    Basekeeping: "Basekeeping";
};
export declare type MinionRole = HashedString;
export declare const MinionRoles: import("../../../../../../RoboPhred/oni-save-parser/src/save-structure/data-types/hashed-string").HashedStringEnum<"MedicalAid" | "Farming" | "Ranching" | "Mining" | "Cooking" | "Art" | "Building" | "Management" | "Research" | "Suits" | "Hauling" | "Technicals" | "Basekeeping">;
