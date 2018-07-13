import { GameObjectBehavior } from "../../game-object-behavior";

import { BehaviorName } from "../types";

export const MinionModifiersBehavior: BehaviorName<MinionModifiersBehavior> =
  "MinionModifiers";
export interface MinionModifiersBehavior extends GameObjectBehavior {
  name: "MinionModifiers";
  templateData: {};
  extraData: MinionModifiersExtraData;
}

/**
 * MinionModifiers is a Modifiers object with some extra runtime behavior.
 * Save data is identical to Modifiers object.
 *
 * Modifiers object saves:
 * amounts: Amounts => Modifications<Amount, AmountInstance>.  Serializes list of InstanceType {count; forEach{name:string; data-length(start); SerializeTypeless(instance:AmountInstance); data-length(end)} }
 * - AmountInstance is templated, has one field "value": float
 *
 * diseases: Diseases => Modifications<Disease, DiseaseInstance> - blahblah
 * - DiseaseInstance should be a template...
 * -- field "exposureInfo" { diseaseID: string; infectionSourceInfo: string}
 */
export interface MinionModifiersExtraData {
  amounts: AmountInstance[];
  diseases: DiseaseInstance[];
}

export interface ModificationInstance {
  name: string;
  data: any;
}

export interface AmountInstance extends ModificationInstance {
  data: number;
}

export interface DiseaseInstance extends ModificationInstance {
  data: {
    diseaseId: string;
    infectionSourceInfo: string;
  };
}
