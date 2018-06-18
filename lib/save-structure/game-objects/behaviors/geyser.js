"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.GeyserBehavior = "Geyser";
// We want to export as number, but compute them by key.
//  Could probably type this better by passing array to a builder func.
exports.GEYSER_TYPE_NAME_HASHES = {
    steam: null,
    hot_steam: null,
    hot_water: null,
    slush_water: null,
    filthy_water: null,
    small_volcano: null,
    big_volcano: null,
    liquid_co2: null,
    hot_co2: null,
    hot_hydrogen: null,
    hot_po2: null,
    slimy_po2: null,
    chlorine_gas: null,
    methane: null,
    molten_copper: null,
    molten_iron: null,
    molten_gold: null,
    oil_drip: null
};
exports.GEYSER_TYPE_NAMES = Object.keys(exports.GEYSER_TYPE_NAME_HASHES);
exports.GEYSER_TYPE_HASH_NAMES = {};
for (let geyserType of exports.GEYSER_TYPE_NAMES) {
    const hash = utils_1.getSDBMHash32(geyserType);
    exports.GEYSER_TYPE_NAME_HASHES[geyserType] = hash;
    exports.GEYSER_TYPE_HASH_NAMES[hash] = geyserType;
}
function getGeyserTypeName(hash) {
    if (!Object.prototype.hasOwnProperty.call(exports.GEYSER_TYPE_HASH_NAMES, hash)) {
        return undefined;
    }
    return exports.GEYSER_TYPE_HASH_NAMES[hash];
}
exports.getGeyserTypeName = getGeyserTypeName;
function getGeyserTypeHash(name) {
    if (!Object.prototype.hasOwnProperty.call(exports.GEYSER_TYPE_NAME_HASHES, name)) {
        return undefined;
    }
    return exports.GEYSER_TYPE_NAME_HASHES[name];
}
exports.getGeyserTypeHash = getGeyserTypeHash;
//# sourceMappingURL=geyser.js.map