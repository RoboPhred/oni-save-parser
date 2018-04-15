import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";

export const HealthBehavior: BehaviorName<HealthBehavior> = "Health";
export interface HealthBehavior extends GameObjectBehavior {
    name: "Health";
    parsedData: {
        CanBeIncapacitated: boolean;
        State: number;
    };
}

export const HEALTH_STATE_NAMES = [
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
