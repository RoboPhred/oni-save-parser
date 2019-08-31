import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";
export declare const MinionAssignablesProxy: BehaviorName<MinionAssignablesProxy>;
export interface MinionAssignablesProxy extends GameObjectBehavior {
    target_instance_id: number;
}
