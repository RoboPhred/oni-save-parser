import { GeyserType } from "../../../const-data/geysers/geyser-type";
import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";
export declare const GeyserBehavior: BehaviorName<GeyserBehavior>;
export interface GeyserBehavior extends GameObjectBehavior {
    name: "Geyser";
    templateData: {
        configuration?: {
            typeId: GeyserType;
            rateRoll: number;
            iterationLengthRoll: number;
            iterationPercentRoll: number;
            yearLengthRoll: number;
            yearPercentRoll: number;
        };
    };
}
