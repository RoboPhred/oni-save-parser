export declare enum HealthState {
    Perfect = 0,
    Alright = 1,
    Scuffed = 2,
    Injured = 3,
    Critical = 4,
    Incapacitated = 5,
    Dead = 6,
    Invincible = 7
}
export declare function getHealthStateName(stateId: number): string | null;
