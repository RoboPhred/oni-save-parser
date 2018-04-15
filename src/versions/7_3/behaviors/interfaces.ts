
import { GameObjectBehavior } from "../interfaces";

export type BehaviorName<T extends GameObjectBehavior> = string & { __behaviorTypeMetadata?: T & never };
