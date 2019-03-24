import { Vector2I } from "../../save-structure/data-types";

import { typed } from "../../utils";

export interface SaveGameData {
  // TODO: Several type-template types in here.  Type them.

  gasConduitFlow: any;
  liquidConduitFlow: any;
  simActiveRegionMin: Vector2I;
  simActiveRegionMax: Vector2I;
  fallingWater: any;
  unstableGround: any;
  worldDetail: any;
  customGameSettings: CustomGameSettings;
  debugWasUsed: boolean;
  autoPrioritizeRoles: any;
  advancedPersonalPriorities: boolean;
  savedInfo: {
    discoveredSurface: boolean;
  };
}

export interface CustomGameSettings {
  is_custom_game: boolean;
  customGameMode: number; // 0 normal, 1 easy, 255 custom
  CurrentQualityLevelsBySetting: QualityLevelSettings[];
}

export type QualityLevelSetting<TKey, TValues> = [
  TKey,
  (TValues extends (infer Value)[] ? Value : never)
];
export type QualityLevelSettings =
  | QualityLevelSetting<"ImmuneSystem", typeof ImmuneSystemSettings>
  | QualityLevelSetting<"Stress", typeof StressSettings>
  | QualityLevelSetting<"Morale", typeof MoraleSettings>
  | QualityLevelSetting<"CalorieBurn", typeof CalorieBurnSettings>
  | QualityLevelSetting<"StressBreaks", typeof StressBreaksSettings>
  | QualityLevelSetting<"SandboxMode", typeof SandboxModeSettings>;

export const ImmuneSystemSettings = [
  typed("Compromised"),
  typed("Weak"),
  typed("Default"),
  typed("Strong"),
  typed("Invincible")
];
export const StressSettings = [
  typed("Doomed"),
  typed("Pessimistic"),
  typed("Default"),
  typed("Optimistic"),
  typed("Indomitable")
];
export const MoraleSettings = [
  typed("VeryHard"),
  typed("Hard"),
  typed("Default"),
  typed("Easy"),
  typed("Disabled")
];
export const CalorieBurnSettings = [
  typed("VeryHard"),
  typed("Hard"),
  typed("Default"),
  typed("Easy"),
  typed("Disabled")
];
export const StressBreaksSettings = ["Disabled", "Default"];
export const SandboxModeSettings = ["Disabled", "Enabled"];

export const QualityLevelSettingValues: Record<
  QualityLevelSettings[0],
  string[]
> = {
  ImmuneSystem: ImmuneSystemSettings,
  Stress: StressSettings,
  StressBreaks: StressBreaksSettings,
  Morale: MoraleSettings,
  CalorieBurn: CalorieBurnSettings,
  SandboxMode: SandboxModeSettings
};
