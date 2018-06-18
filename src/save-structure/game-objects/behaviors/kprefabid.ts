import { GameObjectBehavior } from "../game-objects";
import { BehaviorName } from "./interfaces";

export const KPrefabIDBehavior: BehaviorName<KPrefabIDBehavior> = "KPrefabID";
export interface KPrefabIDBehavior extends GameObjectBehavior {
  name: "KPrefabID";
  templateData: {
    InstanceID: KPrefabID;
  };
}

export type KPrefabID = number;
