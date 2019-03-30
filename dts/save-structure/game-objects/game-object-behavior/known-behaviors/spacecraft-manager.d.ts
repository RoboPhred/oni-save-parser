import { SimHashes } from "../../../const-data";
import { BehaviorName } from "./types";
export declare const SpacecraftManagerBehavior: BehaviorName<SpacecraftManagerBehavior>;
export interface SpacecraftManagerBehavior {
    name: "SpacecraftManager";
    templateData: {
        spacecraft: any[];
        destinations: SpaceDestination[];
    };
}
export interface SpaceDestination {
    id: number;
    type: SpaceDestinationType;
    distance: number;
    activePeriod: number;
    inactivePeriod: number;
    startingOrbitPercentage: number;
    recoverableElements: ([SimHashes, number])[];
    researchOpportunities: SpacecraftResearchOpportunity;
}
export interface SpacecraftResearchOpportunity {
    description: number;
    dataValue: number;
    completed: boolean;
    discoveredRareResource: SimHashes;
    discoveredRareItem: string;
}
export declare enum SpaceDestinationType {
    Satellite = "Satellite",
    MetallicAsteroid = "MetallicAsteroid",
    RockyAsteroid = "RockyAsteroid",
    CarbonaceousAsteroid = "CarbonaceousAsteroid",
    IcyDwarf = "IcyDwarf",
    OrganicDwarf = "OrganicDwarf",
    DustyMoon = "DustyMoon",
    TerraPlanet = "TerraPlanet",
    VolcanoPlanet = "VolcanoPlanet",
    GasGiant = "GasGiant",
    IceGiant = "IceGiant"
}
export declare const SpaceDestinationTypes: SpaceDestinationType[];
