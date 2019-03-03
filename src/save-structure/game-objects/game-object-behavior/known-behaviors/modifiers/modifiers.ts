import { GameObjectBehavior } from "../../game-object-behavior";

import { BehaviorName } from "../types";

export const ModifiersBehavior: BehaviorName<ModifiersBehavior> =
  "Klei.AI.Modifiers";
export interface ModifiersBehavior extends GameObjectBehavior {
  name: "Klei.AI.Modifiers";
  templateData: {};
  extraData: ModifiersExtraData;
}

export interface ModifiersExtraData {
  amounts: AmountInstance[];
  diseases: DiseaseInstance[];
}

export interface ModificationInstance {
  name: string;
  value: any;
}

export interface AmountInstance extends ModificationInstance {
  value: { value: number };
}

export interface DiseaseInstance extends ModificationInstance {
  value: {
    diseaseId: string;
    infectionSourceInfo: string;
  };
}
