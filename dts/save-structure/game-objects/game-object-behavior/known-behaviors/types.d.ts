import { GameObjectBehavior } from "../game-object-behavior";
export declare type BehaviorName<T extends GameObjectBehavior> = string & {
    __behaviorTypeMetadata?: T & never;
};
