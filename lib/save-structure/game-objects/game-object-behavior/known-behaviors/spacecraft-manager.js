"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionState = exports.SpacecraftManagerBehavior = void 0;
exports.SpacecraftManagerBehavior = "SpacecraftManager";
var MissionState;
(function (MissionState) {
    MissionState["Grounded"] = "Grounded";
    MissionState["Launching"] = "Launching";
    MissionState["Underway"] = "Underway";
    MissionState["WaitingToLand"] = "WaitingToLand";
    MissionState["Landing"] = "Landing";
    MissionState["Destroyed"] = "Destroyed";
})(MissionState = exports.MissionState || (exports.MissionState = {}));
//# sourceMappingURL=spacecraft-manager.js.map