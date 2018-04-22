
import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";

export const GeyserBehavior: BehaviorName<GeyserBehavior> = "Geyser";
export interface GeyserBehavior extends GameObjectBehavior {
    name: "Geyser";
    parsedData: {
        configuration?: {
            typeId: {
                hash: number;
            },
            rateRoll: number,
            iterationLengthRoll: number,
            iterationPercentRoll: number,
            yearLengthRoll: number,
            yearPercentRoll: number
        }
    }
}
