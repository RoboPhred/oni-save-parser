import { AssemblyTypeName } from "..";

/**
 * ONI assembly object.
 * Namespace: <root>
 * Class: ```Game.Settings```
 */
export interface GameSettings {
    baseAlreadyCreated: boolean;
    nextUniqueID: number;
    gameID: number;
}
export const GameSettings: AssemblyTypeName<GameSettings> = "Game+Settings";