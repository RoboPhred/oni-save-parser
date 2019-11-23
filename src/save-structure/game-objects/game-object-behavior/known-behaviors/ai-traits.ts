import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";

export const AITraitsBehavior: BehaviorName<AITraitsBehavior> =
  "Klei.AI.Traits";
export interface AITraitsBehavior extends GameObjectBehavior {
  name: "Klei.AI.Traits";
  templateData: {
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
  "ScaredyCat",
  "Allergies",
  "MouthBreather",
  "CalorieBurner",
  "SmallBladder",
  "Anemic",
  "SlowLearner",
  "NoodleArms",
  "InteriorDecorator",
  "SimpleTastes",
  "Foodie",
  "Regeneration",
  "DeeperDiversLungs",
  "SunnyDisposition",
  "RockCrusher",
  "Uncultured",
  "Archaeologist",
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
  "Aggressive",
  "UglyCrier",
  "BingeEater",
  "StressVomiter",
  "BalloonArtist",
  "SparkleStreaker",
  "StickerBomber",
  "SuperProductive",
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
