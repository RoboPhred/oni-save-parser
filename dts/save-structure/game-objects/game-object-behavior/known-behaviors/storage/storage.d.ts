import { GameObject } from "../../../game-object";
import { GameObjectBehavior } from "../../game-object-behavior";
import { BehaviorName } from "../types";
export declare const StorageBehavior: BehaviorName<StorageBehavior>;
export interface StorageBehavior extends GameObjectBehavior {
    name: "Storage";
    templateData: {};
    extraData: StoredGameObject[];
}
export interface StoredGameObject extends GameObject {
    name: string;
}
