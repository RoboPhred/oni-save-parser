"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityLevelSettingValues = exports.SandboxModeSettings = exports.StressBreaksSettings = exports.CalorieBurnSettings = exports.MoraleSettings = exports.StressSettings = exports.ImmuneSystemSettings = void 0;
const utils_1 = require("../../utils");
exports.ImmuneSystemSettings = [
    utils_1.typed("Compromised"),
    utils_1.typed("Weak"),
    utils_1.typed("Default"),
    utils_1.typed("Strong"),
    utils_1.typed("Invincible")
];
exports.StressSettings = [
    utils_1.typed("Doomed"),
    utils_1.typed("Pessimistic"),
    utils_1.typed("Default"),
    utils_1.typed("Optimistic"),
    utils_1.typed("Indomitable")
];
exports.MoraleSettings = [
    utils_1.typed("VeryHard"),
    utils_1.typed("Hard"),
    utils_1.typed("Default"),
    utils_1.typed("Easy"),
    utils_1.typed("Disabled")
];
exports.CalorieBurnSettings = [
    utils_1.typed("VeryHard"),
    utils_1.typed("Hard"),
    utils_1.typed("Default"),
    utils_1.typed("Easy"),
    utils_1.typed("Disabled")
];
exports.StressBreaksSettings = ["Disabled", "Default"];
exports.SandboxModeSettings = ["Disabled", "Enabled"];
exports.QualityLevelSettingValues = {
    ImmuneSystem: exports.ImmuneSystemSettings,
    Stress: exports.StressSettings,
    StressBreaks: exports.StressBreaksSettings,
    Morale: exports.MoraleSettings,
    CalorieBurn: exports.CalorieBurnSettings,
    SandboxMode: exports.SandboxModeSettings
};
//# sourceMappingURL=game-data.js.map