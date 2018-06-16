import { GameObjectBehavior, GameObject } from "../game-objects";
import { BehaviorName } from "./interfaces";

export function getBehavior<T extends GameObjectBehavior>(
  gameObject: GameObject,
  name: BehaviorName<T>
): T | undefined {
  return gameObject.behaviors.find(x => x.name === name) as T | undefined;
}
