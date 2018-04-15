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
//# sourceMappingURL=health.js.map