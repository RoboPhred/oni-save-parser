import { GameObjectBehavior } from "../../game-object-behavior";
import { BehaviorName } from "../types";
export declare const MinionModifiersBehavior: BehaviorName<MinionModifiersBehavior>;
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
    amounts: AIAmountInstance[];
    sicknesses: AISicknessInstance[];
}
export interface MinionModificationInstance {
    name: string;
    value: any;
}
export interface AIAmountInstance extends MinionModificationInstance {
    value: {
        value: number;
    };
}
export interface AISicknessInstance extends MinionModificationInstance {
    value: {
        diseaseId: string;
        exposureInfo: {
            sicknessID: string;
            sourceInfo: string;
        };
    };
}
