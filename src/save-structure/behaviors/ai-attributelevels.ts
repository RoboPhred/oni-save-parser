import { GameObjectBehavior } from "../game-objects";
import { BehaviorName } from "./interfaces";

export const AIAttributeLevelsBehavior: BehaviorName<
  AIAttributeLevelsBehavior
> =
  "Klei.AI.AttributeLevels";
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
