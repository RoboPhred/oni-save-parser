import { BehaviorName } from "../interfaces";
import { GameObjectBehavior, GameObject } from "../../game-objects";
export declare const StorageBehavior: BehaviorName<StorageBehavior>;
export interface StorageBehavior extends GameObjectBehavior {
    name: "Storage";
    templateData: {};
    extraData: StoredGameObject[];
}
export interface StoredGameObject extends GameObject {
    name: string;
}
