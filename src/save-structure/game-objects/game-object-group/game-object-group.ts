import { GameObject } from "../game-object";

export type GameObjectGroups = GameObjectGroup[];

export interface GameObjectGroup {
  name: string;
  gameObjects: GameObject[];
}
