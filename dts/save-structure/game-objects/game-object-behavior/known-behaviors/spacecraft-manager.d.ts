import { SimHashes, SpaceDestinationTypeName } from "../../../const-data";
import { BehaviorName } from "./types";
export declare const SpacecraftManagerBehavior: BehaviorName<SpacecraftManagerBehavior>;
export interface SpacecraftManagerBehavior {
    name: "SpacecraftManager";
    templateData: {
        spacecraft: any[];
        analyzeDestinationID: number;
        destinationAnalysisScores: ([number, number])[];
        destinations: SpaceDestination[];
        savedSpacecraftDestinations: ([number, number])[];
        nextSpacecraftID: number;
        destinationsGenerated: boolean;
    };
}
export interface Spacecraft {
    id: number;
    rocketName: string;
    refLaunchConditions: any;
    moduleCount: number;
    missionState: MissionState;
    missionElapsed: number;
    missionDuration: number;
}
export declare enum MissionState {
    Grounded = "Grounded",
    Launching = "Launching",
    Underway = "Underway",
    WaitingToLand = "WaitingToLand",
    Landing = "Landing",
    Destroyed = "Destroyed"
}
export interface SpaceDestination {
    id: number;
    type: SpaceDestinationTypeName;
    distance: number;
    startingOrbitPercentage: number;
    availableMass: number;
    activePeriod: number;
    inactivePeriod: number;
    /**
     * All elements recoverable by missions to this destination.
     * An array of tuples.  First tuple item is the sim hash
     * of the element, the second tuple item is a value 0 to 1 representing
     * the random factor for how much of this element to recover.
     */
    recoverableElements: ([SimHashes, number])[];
    researchOpportunities: SpacecraftResearchOpportunity[];
}
export interface SpacecraftResearchOpportunity {
    description: string;
    dataValue: number;
    completed: boolean;
    discoveredRareResource: SimHashes;
    discoveredRareItem: string;
}
