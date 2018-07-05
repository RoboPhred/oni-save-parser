import { GameObject } from "../game-object";

import { GameObjectBehavior } from "../game-object-behavior";

import { BehaviorName } from "./known-behaviors";

export function getBehavior<T extends GameObjectBehavior>(
  gameObject: GameObject,
  name: BehaviorName<T>
): T | undefined {
  return gameObject.behaviors.find(x => x.name === name) as T | undefined;
}
