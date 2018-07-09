"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_types_1 = require("../../data-types");
exports.GeyserTypeNames = {
    steam: "steam",
    hot_steam: "hot_steam",
    hot_water: "hot_water",
    slush_water: "slush_water",
    filthy_water: "filthy_water",
    small_volcano: "small_volcano",
    big_volcano: "big_volcano",
    liquid_co2: "liquid_co2",
    hot_co2: "hot_co2",
    hot_hydrogen: "hot_hydrogen",
    hot_po2: "hot_po2",
    slimy_po2: "slimy_po2",
    chlorine_gas: "chlorine_gas",
    methane: "methane",
    molten_copper: "molten_copper",
    molten_iron: "molten_iron",
    molten_gold: "molten_gold",
    oil_drip: "oil_drip"
};
exports.GeyserTypes = data_types_1.createHashedStringEnum(Object.keys(exports.GeyserTypeNames));
//# sourceMappingURL=geyser-type.js.map