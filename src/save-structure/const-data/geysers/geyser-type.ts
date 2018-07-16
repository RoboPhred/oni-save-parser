import { HashedString, createHashedStringEnum } from "../../data-types";

export const GeyserTypeNames = [
  "steam" as "steam",
  "hot_steam" as "hot_steam",
  "hot_water" as "hot_water",
  "slush_water" as "slush_water",
  "filthy_water" as "filthy_water",
  "small_volcano" as "small_volcano",
  "big_volcano" as "big_volcano",
  "liquid_co2" as "liquid_co2",
  "hot_co2" as "hot_co2",
  "hot_hydrogen" as "hot_hydrogen",
  "hot_po2" as "hot_po2",
  "slimy_po2" as "slimy_po2",
  "chlorine_gas" as "chlorine_gas",
  "methane" as "methane",
  "molten_copper" as "molten_copper",
  "molten_iron" as "molten_iron",
  "molten_gold" as "molten_gold",
  "oil_drip" as "oil_drip"
];

export type GeyserType = HashedString;

export const GeyserType = createHashedStringEnum(GeyserTypeNames);
