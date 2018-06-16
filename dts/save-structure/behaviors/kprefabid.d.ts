import { GameObjectBehavior } from "../game-objects";
import { BehaviorName } from "./interfaces";
export declare const KPrefabIDBehavior: BehaviorName<KPrefabIDBehavior>;
export interface KPrefabIDBehavior extends GameObjectBehavior {
    name: "KPrefabID";
    templateData: {
        InstanceID: KPrefabID;
    };
}
export declare type KPrefabID = number;
