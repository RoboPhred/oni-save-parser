import { GameObject } from "../../../game-object";

import { GameObjectBehavior } from "../../game-object-behavior";

import { BehaviorName } from "../types";

export const StorageBehavior: BehaviorName<StorageBehavior> = "Storage";
export interface StorageBehavior extends GameObjectBehavior {
  name: "Storage";
  templateData: {
    onlyFetchMarkedItems: boolean;
    workTimeRemaining: number;
    numberOfUses: number;
  };
  extraData: StoredGameObject[];
}

export interface StoredGameObject extends GameObject {
  name: string;
}
