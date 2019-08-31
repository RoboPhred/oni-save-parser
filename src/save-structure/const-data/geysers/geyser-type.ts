import { HashedString, createHashedStringEnum } from "../../data-types";

export const GeyserTypeNames = [
  "steam",
  "hot_steam",
  "hot_water",
  "slush_water",
  "filthy_water",
  "salt_water",
  "small_volcano",
  "big_volcano",
  "liquid_co2",
  "hot_co2",
  "hot_hydrogen",
  "hot_po2",
  "slimy_po2",
  "chlorine_gas",
  "methane",
  "molten_copper",
  "molten_iron",
  "molten_gold",
  "oil_drip",
] as const;

export type GeyserType = HashedString;

export const GeyserType = createHashedStringEnum(GeyserTypeNames);
