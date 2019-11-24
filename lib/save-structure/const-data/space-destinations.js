"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        materials: ["Steel", "Copper", "Glass"],
        entities: []
    },
    MetallicAsteroid: {
        name: "MetallicAsteroid",
        materials: ["Iron", "Copper", "Obsidian"],
        entities: ["HatchMetal"]
    },
    RockyAsteroid: {
        name: "RockyAsteroid",
        materials: ["Cuprite", "SedimentaryRock", "IgneousRock"],
        entities: ["HatchHard"]
    },
    CarbonaceousAsteroid: {
        name: "CarbonaceousAsteroid",
        materials: ["RefinedCarbon", "Carbon", "Diamond"],
        entities: []
    },
    IcyDwarf: {
        name: "IcyDwarf",
        materials: ["Ice", "SolidCarbonDioxide", "SolidOxygen"],
        entities: ["ColdBreatherSeed", "ColdWheatSeed"]
    },
    OrganicDwarf: {
        name: "OrganicDwarf",
        materials: ["SlimeMold", "Algae", "ContaminatedOxygen"],
        entities: ["Moo", "GasGrassSeed"]
    },
    DustyMoon: {
        name: "DustyMoon",
        materials: ["Regolith", "MaficRock", "SedimentaryRock"],
        entities: []
    },
    TerraPlanet: {
        name: "TerraPlanet",
        materials: ["Water", "Algae", "Oxygen", "Dirt"],
        entities: ["PrickleFlowerSeed", "PacuEgg"]
    },
    VolcanoPlanet: {
        name: "VolcanoPlanet",
        materials: ["Magma", "IgneousRock", "Katairite"],
        entities: []
    },
    GasGiant: {
        name: "GasGiant",
        materials: ["Mercury", "Hydrogen"],
        entities: []
    },
    IceGiant: {
        name: "IceGiant",
        materials: ["Ice", "SolidCarbonDioxide", "SolidOxygen", "SolidMethane"],
        entities: []
    },
    SaltDwarf: {
        name: "SaltDwarf",
        materials: ["SaltWater", "SolidCarbonDioxide", "Brine"],
        entities: ["SaltPlantSeed"]
    },
    RustPlanet: {
        name: "RustPlanet",
        materials: ["Rust", "SolidCarbonDioxide"],
        entities: []
    },
    ForestPlanet: {
        name: "ForestPlanet",
        materials: ["AluminumOre", "SolidOxygen"],
        entities: ["Squirrel", "ForestTreeSeed"]
    },
    RedDwarf: {
        name: "RedDwarf",
        materials: ["Aluminum", "LiquidMethane", "Fossil"],
        entities: []
    },
    GoldAsteroid: {
        name: "GoldAsteroid",
        materials: ["Gold", "Fullerene", "FoolsGold"],
        entities: []
    },
    HydrogenGiant: {
        name: "HydrogenGiant",
        materials: ["LiquidHydrogen", "Water", "Niobium"],
        entities: []
    },
    OilyAsteroid: {
        name: "OilyAsteroid",
        materials: ["SolidMethane", "SolidCarbonDioxide", "CrudeOil", "Petroleum"],
        entities: []
    },
    ShinyPlanet: {
        name: "ShinyPlanet",
        materials: ["Tungsten", "Wolframite"],
        entities: []
    },
    ChlorinePlanet: {
        name: "ChlorinePlanet",
        materials: ["SolidChlorine", "BleachStone"],
        entities: []
    },
    SaltDesertPlanet: {
        name: "SaltDesertPlanet",
        materials: ["Salt", "CrushedRock"],
        entities: ["Crab"]
    },
    Wormhole: {
        name: "Wormhole",
        materials: ["Vacuum"],
        entities: []
    },
    Earth: {
        name: "Earth",
        materials: [],
        entities: []
    }
};
//# sourceMappingURL=space-destinations.js.map