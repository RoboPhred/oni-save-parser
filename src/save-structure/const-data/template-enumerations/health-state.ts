export enum HealthState {
  Perfect,
  Alright,
  Scuffed,
  Injured,
  Critical,
  Incapacitated,
  Dead,
  Invincible
}

export function getHealthStateName(stateId: number): string | null {
  if (
    isNaN(stateId) ||
    !Object.prototype.hasOwnProperty.call(HealthState, stateId)
  ) {
    return null;
  }
  return HealthState[stateId];
}
