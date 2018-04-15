import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";
export declare const KPrefabIDBehavior: BehaviorName<KPrefabIDBehavior>;
export interface KPrefabIDBehavior extends GameObjectBehavior {
    name: "KPrefabID";
    parsedData: {
        InstanceID: number;
    };
}
