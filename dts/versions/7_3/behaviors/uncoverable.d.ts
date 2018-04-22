import { BehaviorName } from "./interfaces";
import { GameObjectBehavior } from "../interfaces";
export declare const UncoverableBehavior: BehaviorName<UncoverableBehavior>;
export interface UncoverableBehavior extends GameObjectBehavior {
    name: "Uncoverable";
    parsedData: {
        hasBeenUncovered: boolean;
    };
}
