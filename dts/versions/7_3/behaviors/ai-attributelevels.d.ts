import { BehaviorName } from "./interfaces";
import { GameObjectBehavior } from "../interfaces";
export declare const AIAttributeLevelsBehavior: BehaviorName<AIAttributeLevelsBehavior>;
export interface AIAttributeLevelsBehavior extends GameObjectBehavior {
    name: "Klei.AI.AttributeLevels";
    parsedData: {
        saveLoadLevels: AttributeLevel[];
    };
}
export interface AttributeLevel {
    attributeId: string;
    experience: number;
    level: number;
}
