import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";
export declare const AIAttributeLevelsBehavior: BehaviorName<AIAttributeLevelsBehavior>;
export interface AIAttributeLevelsBehavior extends GameObjectBehavior {
    name: "Klei.AI.AttributeLevels";
    templateData: {
        saveLoadLevels: AttributeLevel[];
    };
}
export interface AttributeLevel {
    attributeId: string;
    experience: number;
    level: number;
}
