import { GameObjectBehavior } from "../game-objects";
import { BehaviorName } from "./interfaces";

export const HealthBehavior: BehaviorName<HealthBehavior> = "Health";
export interface HealthBehavior extends GameObjectBehavior {
  name: "Health";
  templateData: {
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

export const HEALTH_STATE_MIN = 0;
export const HEALTH_STATE_MAX = HEALTH_STATE_NAMES.length - 1;

export function getHealthStateName(stateID: number): string | null {
  if (isNaN(stateID) || stateID < 0 || stateID > HEALTH_STATE_NAMES.length) {
    return null;
  }
  return HEALTH_STATE_NAMES[stateID];
}
