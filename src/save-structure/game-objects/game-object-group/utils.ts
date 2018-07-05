import { GameObjectGroups, GameObjectGroup } from "./game-object-group";

export function getGameObjectGroup(
  groups: GameObjectGroups,
  name: string
): GameObjectGroup | undefined {
  return groups.find(x => x.name === name);
}
