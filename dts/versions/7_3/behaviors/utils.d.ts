import { GameObjectBehavior, GameObject } from "../interfaces";
import { BehaviorName } from "./interfaces";
export declare function getBehavior<T extends GameObjectBehavior>(gameObject: GameObject, name: BehaviorName<T>): T | undefined;
