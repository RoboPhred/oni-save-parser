import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";
export declare const AITraitsBehavior: BehaviorName<AITraitsBehavior>;
export interface AITraitsBehavior extends GameObjectBehavior {
    name: "Klei.AI.Traits";
    parsedData: {
        TraitIds: string[];
    };
}
export declare const AI_TRAITS: string[];
