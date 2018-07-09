import { GeyserType } from "../../../const-data/geysers/geyser-type";

import { GameObjectBehavior } from "../game-object-behavior";

import { BehaviorName } from "./types";

export const GeyserBehavior: BehaviorName<GeyserBehavior> = "Geyser";
export interface GeyserBehavior extends GameObjectBehavior {
  name: "Geyser";
  templateData: {
    configuration?: {
      typeId: GeyserType;
      rateRoll: number;
      iterationLengthRoll: number;
      iterationPercentRoll: number;
      yearLengthRoll: number;
      yearPercentRoll: number;
    };
  };
}
