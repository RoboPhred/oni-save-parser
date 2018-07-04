import { getSDBMHash32 } from "../../../utils";

import { GameObjectBehavior } from "../game-object-behavior";

import { BehaviorName } from "./types";

export const GeyserBehavior: BehaviorName<GeyserBehavior> = "Geyser";
export interface GeyserBehavior extends GameObjectBehavior {
  name: "Geyser";
  templateData: {
    configuration?: {
      typeId: {
        hash: number;
      };
      rateRoll: number;
      iterationLengthRoll: number;
      iterationPercentRoll: number;
      yearLengthRoll: number;
      yearPercentRoll: number;
    };
  };
}

// We want to export as number, but compute them by key.
//  Could probably type this better by passing array to a builder func.
export const GEYSER_TYPE_NAME_HASHES = {
  steam: (null as any) as number,
  hot_steam: (null as any) as number,
  hot_water: (null as any) as number,
  slush_water: (null as any) as number,
  filthy_water: (null as any) as number,

  small_volcano: (null as any) as number,
  big_volcano: (null as any) as number,

  liquid_co2: (null as any) as number,
  hot_co2: (null as any) as number,

  hot_hydrogen: (null as any) as number,

  hot_po2: (null as any) as number,
  slimy_po2: (null as any) as number,

  chlorine_gas: (null as any) as number,

  methane: (null as any) as number,

  molten_copper: (null as any) as number,
  molten_iron: (null as any) as number,
  molten_gold: (null as any) as number,

  oil_drip: (null as any) as number
};

export type GeyserTypeName = keyof typeof GEYSER_TYPE_NAME_HASHES;
export const GEYSER_TYPE_NAMES = Object.keys(
  GEYSER_TYPE_NAME_HASHES
) as GeyserTypeName[];
export const GEYSER_TYPE_HASH_NAMES: { [key: number]: GeyserTypeName } = {};

for (let geyserType of GEYSER_TYPE_NAMES) {
  const hash = getSDBMHash32(geyserType);
  GEYSER_TYPE_NAME_HASHES[geyserType] = hash;
  GEYSER_TYPE_HASH_NAMES[hash] = geyserType;
}

export function getGeyserTypeName(hash: number): string | undefined {
  if (!Object.prototype.hasOwnProperty.call(GEYSER_TYPE_HASH_NAMES, hash)) {
    return undefined;
  }
  return GEYSER_TYPE_HASH_NAMES[hash];
}

export function getGeyserTypeHash(name: string): number | undefined {
  if (!Object.prototype.hasOwnProperty.call(GEYSER_TYPE_NAME_HASHES, name)) {
    return undefined;
  }
  return GEYSER_TYPE_NAME_HASHES[name as GeyserTypeName];
}
