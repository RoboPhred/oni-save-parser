import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";
export declare const AITraitsBehavior: BehaviorName<AITraitsBehavior>;
export interface AITraitsBehavior extends GameObjectBehavior {
    name: "Klei.AI.Traits";
    templateData: {
        TraitIds: string[];
    };
}
export declare const AI_TRAIT_IDS: string[];
