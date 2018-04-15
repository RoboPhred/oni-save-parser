import { GameObjectBehavior } from "../interfaces";
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
