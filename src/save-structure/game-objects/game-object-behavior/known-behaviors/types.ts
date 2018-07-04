import { GameObjectBehavior } from "../game-object-behavior";

export type BehaviorName<T extends GameObjectBehavior> = string & {
  __behaviorTypeMetadata?: T & never;
};
