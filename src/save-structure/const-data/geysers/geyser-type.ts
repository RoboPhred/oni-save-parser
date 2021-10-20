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
  "molten_aluminum",
  "molten_tungsten",
  "molten_niobium",
  "NiobiumGeyser",
  "MethaneGeyser",
  "molten_cobalt",
  "oil_drip",
  "liquid_sulfur",
  "molten_steel",
  "molten_glass",
  "liquid_coolant",
  "liquid_ethanol",
  "slush_salt_water"
] as const;

export type GeyserType = HashedString;

export const GeyserType = createHashedStringEnum(GeyserTypeNames);
