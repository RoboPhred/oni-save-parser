import { SimHashName } from "./template-enumerations";
import { typedKeys } from "../../utils";

export interface SpaceDestinationType {
  name: string;
  materials: SimHashName[];
  entities: string[];
}

export enum SpaceDestinationTypeName {
  Satellite = "Satellite",
  MetallicAsteroid = "MetallicAsteroid",
  RockyAsteroid = "RockyAsteroid",
  CarbonaceousAsteroid = "CarbonaceousAsteroid",
  IcyDwarf = "IcyDwarf",
  OrganicDwarf = "OrganicDwarf",
  DustyMoon = "DustyMoon",
  TerraPlanet = "TerraPlanet",
  VolcanoPlanet = "VolcanoPlanet",
  GasGiant = "GasGiant",
  IceGiant = "IceGiant",
  SaltDwarf = "SaltDwarf",
  RustPlanet = "RustPlanet",
  ForestPlanet = "ForestPlanet",
  RedDwarf = "RedDwarf",
  GoldAsteroid = "GoldAsteroid",
  HydrogenGiant = "HydrogenGiant",
  OilyAsteroid = "OilyAsteroid",
  ShinyPlanet = "ShinyPlanet",
  ChlorinePlanet = "ChlorinePlanet",
  SaltDesertPlanet = "SaltDesertPlanet",
  Wormhole = "Wormhole",
  Earth = "Earth"
}
export const SpaceDestinationTypeNames = typedKeys(SpaceDestinationTypeName);

export const SpaceDestinationTypes: Record<
  SpaceDestinationTypeName,
  SpaceDestinationType
> = {
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
