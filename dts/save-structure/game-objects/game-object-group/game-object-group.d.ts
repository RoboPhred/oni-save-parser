import { GameObject } from "../game-object";
export declare type GameObjectGroups = GameObjectGroup[];
export interface GameObjectGroup {
    name: string;
    gameObjects: GameObject[];
}
