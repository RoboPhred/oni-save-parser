import { SimHashName } from "./template-enumerations";
export interface SpaceDestinationType {
    name: string;
    maximumMass: number;
    minimumMass: number;
    materials: SimHashName[];
    entities: string[];
}
export declare enum SpaceDestinationTypeName {
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
export declare const SpaceDestinationTypeNames: ("Satellite" | "MetallicAsteroid" | "RockyAsteroid" | "CarbonaceousAsteroid" | "IcyDwarf" | "OrganicDwarf" | "DustyMoon" | "TerraPlanet" | "VolcanoPlanet" | "GasGiant" | "IceGiant" | "SaltDwarf" | "RustPlanet" | "ForestPlanet" | "RedDwarf" | "GoldAsteroid" | "HydrogenGiant" | "OilyAsteroid" | "ShinyPlanet" | "ChlorinePlanet" | "SaltDesertPlanet" | "Wormhole" | "Earth")[];
export declare const SpaceDestinationTypes: Record<SpaceDestinationTypeName, SpaceDestinationType>;
