import { GameObjectBehavior } from "../interfaces";
export declare type BehaviorName<T extends GameObjectBehavior> = string & {
    __behaviorTypeMetadata?: T & never;
};
