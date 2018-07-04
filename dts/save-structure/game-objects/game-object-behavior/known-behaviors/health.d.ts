import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";
export declare const HealthBehavior: BehaviorName<HealthBehavior>;
export interface HealthBehavior extends GameObjectBehavior {
    name: "Health";
    templateData: {
        CanBeIncapacitated: boolean;
        State: number;
    };
}
export declare const HEALTH_STATE_NAMES: string[];
export declare const HEALTH_STATE_MIN = 0;
export declare const HEALTH_STATE_MAX: number;
export declare function getHealthStateName(stateID: number): string | null;
