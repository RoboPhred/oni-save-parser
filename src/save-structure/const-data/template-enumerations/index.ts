export * from "./health-state";
export * from "./sim-hashes";

import { HealthState } from "./health-state";
import { SimHashes } from "./sim-hashes";

export const EnumerationsByName = {
  "Health+HealthState": HealthState,
  SimHashes
};
