import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";

export const MinionAssignablesProxy: BehaviorName<MinionAssignablesProxy> =
  "MinionAssignablesProxy";
export interface MinionAssignablesProxy extends GameObjectBehavior {
  target_instance_id: number;
}
