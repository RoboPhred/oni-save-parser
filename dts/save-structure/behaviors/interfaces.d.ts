import { GameObjectBehavior } from "../game-objects";
export declare type BehaviorName<T extends GameObjectBehavior> = string & {
    __behaviorTypeMetadata?: T & never;
};
