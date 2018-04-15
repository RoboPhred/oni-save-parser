"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthBehavior = "Health";
exports.HEALTH_STATE_NAMES = [
    // The order of these is important!
    //  The value is stored in-game as an int32 enum,
    //  and the order of these correspond to the
    //  enum's integer value.
    "Perfect",
    "Alright",
    "Scuffed",
    "Injured",
    "Critical",
    "Incapacited",
    "Dead",
    "Invincible"
];
exports.HEALTH_STATE_MIN = 0;
exports.HEALTH_STATE_MAX = exports.HEALTH_STATE_NAMES.length - 1;
function getHealthStateName(stateID) {
    if (isNaN(stateID) || stateID < 0 || stateID > exports.HEALTH_STATE_NAMES.length) {
        return null;
    }
    return exports.HEALTH_STATE_NAMES[stateID];
}
exports.getHealthStateName = getHealthStateName;
//# sourceMappingURL=health.js.map