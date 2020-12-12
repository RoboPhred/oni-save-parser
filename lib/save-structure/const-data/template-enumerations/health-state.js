"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthStateName = exports.HealthState = void 0;
var HealthState;
(function (HealthState) {
    HealthState[HealthState["Perfect"] = 0] = "Perfect";
    HealthState[HealthState["Alright"] = 1] = "Alright";
    HealthState[HealthState["Scuffed"] = 2] = "Scuffed";
    HealthState[HealthState["Injured"] = 3] = "Injured";
    HealthState[HealthState["Critical"] = 4] = "Critical";
    HealthState[HealthState["Incapacitated"] = 5] = "Incapacitated";
    HealthState[HealthState["Dead"] = 6] = "Dead";
    HealthState[HealthState["Invincible"] = 7] = "Invincible";
})(HealthState = exports.HealthState || (exports.HealthState = {}));
function getHealthStateName(stateId) {
    if (isNaN(stateId) ||
        !Object.prototype.hasOwnProperty.call(HealthState, stateId)) {
        return null;
    }
    return HealthState[stateId];
}
exports.getHealthStateName = getHealthStateName;
//# sourceMappingURL=health-state.js.map