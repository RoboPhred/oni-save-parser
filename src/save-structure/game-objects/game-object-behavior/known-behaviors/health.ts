import { HealthState } from "../../../const-data";

import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";

export const HealthBehavior: BehaviorName<HealthBehavior> = "Health";
export interface HealthBehavior extends GameObjectBehavior {
  name: "Health";
  templateData: {
    CanBeIncapacitated: boolean;
    State: HealthState;
  };
}
