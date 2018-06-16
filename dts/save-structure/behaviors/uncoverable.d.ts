import { BehaviorName } from "./interfaces";
import { GameObjectBehavior } from "../game-objects";
export declare const UncoverableBehavior: BehaviorName<UncoverableBehavior>;
export interface UncoverableBehavior extends GameObjectBehavior {
    name: "Uncoverable";
    parsedData: {
        hasBeenUncovered: boolean;
    };
}
