import { createHashedStringEnum, HashedString } from "../../data-types";

export const MinionRoleNames = [
  "Farming" as "Farming",
  "Ranching" as "Ranching",
  "Mining" as "Mining",
  "Cooking" as "Cooking",
  "Art" as "Art",
  "Building" as "Building",
  "Management" as "Management",
  "Research" as "Research",
  "Suits" as "Suits",
  "Hauling" as "Hauling",
  "Technicals" as "Technicals",
  "MedicalAid" as "MedicalAid",
  "Basekeeping" as "Basekeeping"
];
export type MinionRole = HashedString;

export const MinionRole = createHashedStringEnum(MinionRoleNames);
