import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";

export const AITraitsBehavior: BehaviorName<AITraitsBehavior> =
  "Klei.AI.Traits";
export interface AITraitsBehavior extends GameObjectBehavior {
  name: "Klei.AI.Traits";
  parsedData: {
    TraitIds: string[];
  };
}

export const AI_TRAIT_IDS: string[] = [
  "None",
  "Stinky",
  "Ellie",
  "Joshua",
  "Liam",
  "CantResearch",
  "CantBuild",
  "CantCook",
  "CantDig",
  "Hemophobia",
  "MedicalAid",
  "ScaredyCat",
  "MouthBreather",
  "CalorieBurner",
  "SmallBladder",
  "Anemic",
  "SlowLearner",
  "NoodleArms",
  "InteriorDecorator",
  "Regeneration",
  "DeeperDiversLungs",
  "SunnyDisposition",
  "RockCrusher",
  "Uncultured",
  "WeakImmuneSystem",
  "IrritableBowel",
  "Flatulence",
  "Snorer",
  "Narcolepsy",
  "Twinkletoes",
  "Greasemonkey",
  "MoleHands",
  "FastLearner",
  "DiversLung",
  "StrongArm",
  "IronGut",
  "StrongImmuneSystem",
  "BedsideManner",
  "Caring",
  "Aggressive",
  "UglyCrier",
  "BingeEater",
  "StressVomiter",
  "EarlyBird",
  "NightOwl",
  "Claustrophobic",
  "PrefersWarmer",
  "PrefersColder",
  "SensitiveFeet",
  "Fashionable",
  "Climacophobic",
  "SolitarySleeper",
  "Workaholic"
];
