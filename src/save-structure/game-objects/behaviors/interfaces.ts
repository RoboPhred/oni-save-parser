import { GameObjectBehavior } from "../game-objects";

export type BehaviorName<T extends GameObjectBehavior> = string & {
  __behaviorTypeMetadata?: T & never;
};
