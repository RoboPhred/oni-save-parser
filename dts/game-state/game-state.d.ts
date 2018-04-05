import { Logger } from "../logging";
import { DataReader } from "../data-reader";
import { TypeDeserializer } from "../type-templates";
import { OniGameState } from "./services";
import { GameObject } from "./interfaces";
export declare class OniGameStateManagerImpl implements OniGameState {
    private _deserializer;
    private _logger;
    static readonly SAVE_HEADER: string;
    static readonly CURRENT_VERSION_MAJOR: number;
    static readonly CURRENT_VERSION_MINOR: number;
    gameObjects: Map<string, GameObject[]>;
    constructor(_deserializer: TypeDeserializer, _logger: Logger);
    parse(reader: DataReader): void;
    toJSON(): {
        gameObjects: {
            [key: string]: any[];
        };
    };
    private _parsePrefabs(reader);
    private _parsePrefabSet(reader, prefabName);
    private _parseGameObject(reader);
    private _parseGameObjectBehavior(reader, behaviorName);
}
