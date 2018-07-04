import { BehaviorName } from "./types";
import { GameObjectBehavior } from "../game-object-behavior";

export const UncoverableBehavior: BehaviorName<UncoverableBehavior> =
  "Uncoverable";
export interface UncoverableBehavior extends GameObjectBehavior {
  name: "Uncoverable";
  templateData: {
    hasBeenUncovered: boolean;
  };
}
