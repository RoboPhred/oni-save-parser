import { GameObjectBehavior } from "../game-objects";
import { BehaviorName } from "./interfaces";
export declare const HealthBehavior: BehaviorName<HealthBehavior>;
export interface HealthBehavior extends GameObjectBehavior {
    name: "Health";
    parsedData: {
        CanBeIncapacitated: boolean;
        State: number;
    };
}
export declare const HEALTH_STATE_NAMES: string[];
export declare const HEALTH_STATE_MIN = 0;
export declare const HEALTH_STATE_MAX: number;
export declare function getHealthStateName(stateID: number): string | null;
