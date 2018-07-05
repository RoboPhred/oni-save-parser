import { GameObject } from "../game-object";
import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./known-behaviors";
export declare function getBehavior<T extends GameObjectBehavior>(gameObject: GameObject, name: BehaviorName<T>): T | undefined;
