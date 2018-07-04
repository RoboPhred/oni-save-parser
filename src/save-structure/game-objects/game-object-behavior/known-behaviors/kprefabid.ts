import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";

export const KPrefabIDBehavior: BehaviorName<KPrefabIDBehavior> = "KPrefabID";
export interface KPrefabIDBehavior extends GameObjectBehavior {
  name: "KPrefabID";
  templateData: {
    InstanceID: KPrefabID;
  };
}

export type KPrefabID = number;
