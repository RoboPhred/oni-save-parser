import { Logger } from "../logging";
import { DataReader } from "../data-reader";
import { TypeDeserializer } from "../type-templates";
import { OniGameStateManager } from "./services";
import { GameObject } from "./interfaces";
export declare class OniGameStateManagerImpl implements OniGameStateManager {
    private _deserializer;
    private _logger;
    static readonly SAVE_HEADER: string;
    static readonly CURRENT_VERSION_MAJOR: number;
    static readonly CURRENT_VERSION_MINOR: number;
    gameObjects: Map<string, GameObject[]>;
    constructor(_deserializer: TypeDeserializer, _logger: Logger);
    parse(reader: DataReader): void;
    private _parsePrefabs(reader);
    private _parsePrefabSet(reader);
    private _parseGameObject(reader);
    private _parseGameObjectBehavior(reader, behaviorName);
}
