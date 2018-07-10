import { HashedString } from "../../../../save-structure/data-types";

import { SimHashes } from "../../../const-data";

import { GameObjectBehavior } from "../game-object-behavior";

import { BehaviorName } from "./types";

export const PrimaryElementBehavior: BehaviorName<PrimaryElementBehavior> =
  "PrimaryElement";
export interface PrimaryElementBehavior extends GameObjectBehavior {
  name: "PrimaryElement";
  templateData: {
    ElementID: SimHashes;
    Units: number;
    _Temperature: number;

    diseaseID: HashedString;
    diseaseCount: number;
  };
}
