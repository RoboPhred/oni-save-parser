import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";
export declare const AIEffectsBehavior: BehaviorName<AIEffectsBehavior>;
export interface AIEffectsBehavior extends GameObjectBehavior {
    name: "Klei.AI.Effects";
    parsedData: {
        saveLoadEffects: EffectInstance[];
    };
}
export interface EffectInstance {
    id: string;
    timeRemaining: number;
}
export declare const AI_EFFECT_IDS: string[];
