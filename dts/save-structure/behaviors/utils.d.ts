import { GameObjectBehavior, GameObject } from "../game-objects";
import { BehaviorName } from "./interfaces";
export declare function getBehavior<T extends GameObjectBehavior>(gameObject: GameObject, name: BehaviorName<T>): T | undefined;
