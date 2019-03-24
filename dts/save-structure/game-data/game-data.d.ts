import { Vector2I } from "../../save-structure/data-types";
export interface SaveGameData {
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
    customGameMode: number;
    CurrentQualityLevelsBySetting: QualityLevelSettings[];
}
export declare type QualityLevelSetting<TKey, TValues> = [TKey, (TValues extends (infer Value)[] ? Value : never)];
export declare type QualityLevelSettings = QualityLevelSetting<"ImmuneSystem", typeof ImmuneSystemSettings> | QualityLevelSetting<"Stress", typeof StressSettings> | QualityLevelSetting<"Morale", typeof MoraleSettings> | QualityLevelSetting<"CalorieBurn", typeof CalorieBurnSettings> | QualityLevelSetting<"StressBreaks", typeof StressBreaksSettings> | QualityLevelSetting<"SandboxMode", typeof SandboxModeSettings>;
export declare const ImmuneSystemSettings: ("Compromised" | "Weak" | "Default" | "Strong" | "Invincible")[];
export declare const StressSettings: ("Default" | "Doomed" | "Pessimistic" | "Optimistic" | "Indomitable")[];
export declare const MoraleSettings: ("Default" | "VeryHard" | "Hard" | "Easy" | "Disabled")[];
export declare const CalorieBurnSettings: ("Default" | "VeryHard" | "Hard" | "Easy" | "Disabled")[];
export declare const StressBreaksSettings: string[];
export declare const SandboxModeSettings: string[];
export declare const QualityLevelSettingValues: Record<QualityLevelSettings[0], string[]>;
