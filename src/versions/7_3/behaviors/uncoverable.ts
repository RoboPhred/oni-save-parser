import { BehaviorName } from "./interfaces";
import { GameObjectBehavior } from "../interfaces";

export const UncoverableBehavior: BehaviorName<UncoverableBehavior> = "Uncoverable";
export interface UncoverableBehavior extends GameObjectBehavior {
    name: "Uncoverable";
    parsedData: {
        hasBeenUncovered: boolean;
    }
}
