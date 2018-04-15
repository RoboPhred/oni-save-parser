import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";

export const AIEffectsBehavior: BehaviorName<AIEffectsBehavior> = "Klei.AI.Effects";
export interface AIEffectsBehavior extends GameObjectBehavior {
    name: "Klei.AI.Effects";
    parsedData: {
        saveLoadEffects: EffectInstance[]
    }
}
export interface EffectInstance {
    id: string;
    timeRemaining: number;
}

// TODO: move to oni-save-parser
export const AI_EFFECT_NAMES: string[] = [
    "UncomfortableSleep",
    "Sleep",
    "NarcolepticSleep",
    "RestfulSleep",
    "AnewHope",
    "Mourning",
    "DisturbedSleep",
    "NewCrewArrival",
    "UnderWater",
    "FullBladder",
    "StressfulyEmptyingBladder",
    "RedAlert",
    "MentalBreak",
    "CoolingDown",
    "WarmingUp",
    "Darkness",
    "SteppedInContaminatedWater",
    "WellFed",
    "StaleFood",
    "SmelledPutridOdour",
    "Vomiting",
    "DirtyHands",
    "Unclean",
    "LightWounds",
    "ModerateWounds",
    "SevereWounds",
    "WasAttacked",
    "SoreBack",
    "WarmAir",
    "ColdAir",
    "Hypothermia",
    "Hyperthermia",

    // Found in DB.cs
    "CenterOfAttention"
];
