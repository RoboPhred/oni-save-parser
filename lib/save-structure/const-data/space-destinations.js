"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceDestinationTypes = exports.SpaceDestinationTypeNames = exports.SpaceDestinationTypeName = void 0;
const utils_1 = require("../../utils");
var SpaceDestinationTypeName;
(function (SpaceDestinationTypeName) {
    SpaceDestinationTypeName["Satellite"] = "Satellite";
    SpaceDestinationTypeName["MetallicAsteroid"] = "MetallicAsteroid";
    SpaceDestinationTypeName["RockyAsteroid"] = "RockyAsteroid";
    SpaceDestinationTypeName["CarbonaceousAsteroid"] = "CarbonaceousAsteroid";
    SpaceDestinationTypeName["IcyDwarf"] = "IcyDwarf";
    SpaceDestinationTypeName["OrganicDwarf"] = "OrganicDwarf";
    SpaceDestinationTypeName["DustyMoon"] = "DustyMoon";
    SpaceDestinationTypeName["TerraPlanet"] = "TerraPlanet";
    SpaceDestinationTypeName["VolcanoPlanet"] = "VolcanoPlanet";
    SpaceDestinationTypeName["GasGiant"] = "GasGiant";
    SpaceDestinationTypeName["IceGiant"] = "IceGiant";
    SpaceDestinationTypeName["SaltDwarf"] = "SaltDwarf";
    SpaceDestinationTypeName["RustPlanet"] = "RustPlanet";
    SpaceDestinationTypeName["ForestPlanet"] = "ForestPlanet";
    SpaceDestinationTypeName["RedDwarf"] = "RedDwarf";
    SpaceDestinationTypeName["GoldAsteroid"] = "GoldAsteroid";
    SpaceDestinationTypeName["HydrogenGiant"] = "HydrogenGiant";
    SpaceDestinationTypeName["OilyAsteroid"] = "OilyAsteroid";
    SpaceDestinationTypeName["ShinyPlanet"] = "ShinyPlanet";
    SpaceDestinationTypeName["ChlorinePlanet"] = "ChlorinePlanet";
    SpaceDestinationTypeName["SaltDesertPlanet"] = "SaltDesertPlanet";
    SpaceDestinationTypeName["Wormhole"] = "Wormhole";
    SpaceDestinationTypeName["Earth"] = "Earth";
})(SpaceDestinationTypeName = exports.SpaceDestinationTypeName || (exports.SpaceDestinationTypeName = {}));
exports.SpaceDestinationTypeNames = utils_1.typedKeys(SpaceDestinationTypeName);
exports.SpaceDestinationTypes = {
    Satellite: {
        name: "Satellite",
        maximumMass: 64000000,
        minimumMass: 63994000,
        materials: ["Steel", "Copper", "Glass"],
        entities: []
    },
    MetallicAsteroid: {
        name: "MetallicAsteroid",
        maximumMass: 128000000,
        minimumMass: 127988000,
        materials: ["Iron", "Copper", "Obsidian"],
        entities: ["HatchMetal"]
    },
    RockyAsteroid: {
        name: "RockyAsteroid",
        maximumMass: 128000000,
        minimumMass: 127988000,
        materials: ["Cuprite", "SedimentaryRock", "IgneousRock"],
        entities: ["HatchHard"]
    },
    CarbonaceousAsteroid: {
        name: "CarbonaceousAsteroid",
        maximumMass: 128000000,
        minimumMass: 127988000,
        materials: ["RefinedCarbon", "Carbon", "Diamond"],
        entities: []
    },
    IcyDwarf: {
        name: "IcyDwarf",
        maximumMass: 256000000,
        minimumMass: 255982000,
        materials: ["Ice", "SolidCarbonDioxide", "SolidOxygen"],
        entities: ["ColdBreatherSeed", "ColdWheatSeed"]
    },
    OrganicDwarf: {
        name: "OrganicDwarf",
        maximumMass: 256000000,
        minimumMass: 255982000,
        materials: ["SlimeMold", "Algae", "ContaminatedOxygen"],
        entities: ["Moo", "GasGrassSeed"]
    },
    DustyMoon: {
        name: "DustyMoon",
        maximumMass: 256000000,
        minimumMass: 255982000,
        materials: ["Regolith", "MaficRock", "SedimentaryRock"],
        entities: []
    },
    TerraPlanet: {
        name: "TerraPlanet",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["Water", "Algae", "Oxygen", "Dirt"],
        entities: ["PrickleFlowerSeed", "PacuEgg"]
    },
    VolcanoPlanet: {
        name: "VolcanoPlanet",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["Magma", "IgneousRock", "Katairite"],
        entities: []
    },
    GasGiant: {
        name: "GasGiant",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["Mercury", "Hydrogen"],
        entities: []
    },
    IceGiant: {
        name: "IceGiant",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["Ice", "SolidCarbonDioxide", "SolidOxygen", "SolidMethane"],
        entities: []
    },
    SaltDwarf: {
        name: "SaltDwarf",
        maximumMass: 256000000,
        minimumMass: 255982000,
        materials: ["SaltWater", "SolidCarbonDioxide", "Brine"],
        entities: ["SaltPlantSeed"]
    },
    RustPlanet: {
        name: "RustPlanet",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["Rust", "SolidCarbonDioxide"],
        entities: []
    },
    ForestPlanet: {
        name: "ForestPlanet",
        maximumMass: 384000000,
        minimumMass: 384000000,
        materials: ["AluminumOre", "SolidOxygen"],
        entities: ["Squirrel", "ForestTreeSeed"]
    },
    RedDwarf: {
        name: "RedDwarf",
        maximumMass: 256000000,
        minimumMass: 255982000,
        materials: ["Aluminum", "LiquidMethane", "Fossil"],
        entities: []
    },
    GoldAsteroid: {
        name: "GoldAsteroid",
        maximumMass: 128000000,
        minimumMass: 127988000,
        materials: ["Gold", "Fullerene", "FoolsGold"],
        entities: []
    },
    HydrogenGiant: {
        name: "HydrogenGiant",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["LiquidHydrogen", "Water", "Niobium"],
        entities: []
    },
    OilyAsteroid: {
        name: "OilyAsteroid",
        maximumMass: 128000000,
        minimumMass: 127988000,
        materials: ["SolidMethane", "SolidCarbonDioxide", "CrudeOil", "Petroleum"],
        entities: []
    },
    ShinyPlanet: {
        name: "ShinyPlanet",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["Tungsten", "Wolframite"],
        entities: []
    },
    ChlorinePlanet: {
        name: "ChlorinePlanet",
        maximumMass: 256000000,
        minimumMass: 255982000,
        materials: ["SolidChlorine", "BleachStone"],
        entities: []
    },
    SaltDesertPlanet: {
        name: "SaltDesertPlanet",
        maximumMass: 384000000,
        minimumMass: 383980000,
        materials: ["Salt", "CrushedRock"],
        entities: ["Crab"]
    },
    Wormhole: {
        name: "Wormhole",
        maximumMass: 0,
        minimumMass: 0,
        materials: ["Vacuum"],
        entities: []
    },
    Earth: {
        name: "Earth",
        maximumMass: 0,
        minimumMass: 0,
        materials: [],
        entities: []
    }
};
//# sourceMappingURL=space-destinations.js.map