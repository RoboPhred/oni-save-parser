"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeyserType = exports.GeyserTypeNames = void 0;
const data_types_1 = require("../../data-types");
exports.GeyserTypeNames = [
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
];
exports.GeyserType = data_types_1.createHashedStringEnum(exports.GeyserTypeNames);
//# sourceMappingURL=geyser-type.js.map