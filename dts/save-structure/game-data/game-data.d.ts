import { Vector2I } from "../../save-structure/data-types";
export interface SaveGameData {
    gasConduitFlow: any;
    liquidConduitFlow: any;
    simActiveRegionMin: Vector2I;
    simActiveRegionMax: Vector2I;
    fallingWater: any;
    unstableGround: any;
    worldDetail: any;
    customGameSettings: any;
    debugWasUsed: boolean;
    autoPrioritizeRoles: any;
    advancedPersonalPriorities: boolean;
}
