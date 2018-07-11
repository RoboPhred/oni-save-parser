import { Accessory } from "../../../const-data/accessories";
import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";
export declare const AccessorizerBehavior: BehaviorName<AccessorizerBehavior>;
export interface AccessorizerBehavior extends GameObjectBehavior {
    name: "Accessorizer";
    templateData: {
        accessories: Accessory[];
    };
}
