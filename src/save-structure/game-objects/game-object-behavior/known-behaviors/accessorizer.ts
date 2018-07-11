import { Accessory } from "../../../const-data/accessories";

import { GameObjectBehavior } from "../game-object-behavior";

import { BehaviorName } from "./types";

export const AccessorizerBehavior: BehaviorName<AccessorizerBehavior> =
  "Accessorizer";
export interface AccessorizerBehavior extends GameObjectBehavior {
  name: "Accessorizer";
  templateData: {
    accessories: Accessory[];
  };
}
