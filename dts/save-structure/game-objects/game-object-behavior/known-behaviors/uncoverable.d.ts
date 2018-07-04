import { BehaviorName } from "./types";
import { GameObjectBehavior } from "../game-object-behavior";
export declare const UncoverableBehavior: BehaviorName<UncoverableBehavior>;
export interface UncoverableBehavior extends GameObjectBehavior {
    name: "Uncoverable";
    templateData: {
        hasBeenUncovered: boolean;
    };
}
