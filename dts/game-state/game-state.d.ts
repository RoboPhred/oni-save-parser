import { Logger } from "../logging";
import { DataReader, DataWriter } from "../binary-serializer";
import { TypeSerializer } from "../type-serializer";
import { OniGameState } from "./services";
import { GameObject } from "./interfaces";
export declare class OniGameStateManagerImpl implements OniGameState {
    private _typeSerializer;
    private _logger;
    static readonly SAVE_HEADER: string;
    static readonly CURRENT_VERSION_MAJOR: number;
    static readonly CURRENT_VERSION_MINOR: number;
    gameObjects: Map<string, GameObject[]>;
    private _gameObjectOrdering;
    private _versionMinor;
    constructor(_typeSerializer: TypeSerializer, _logger: Logger);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {
        gameObjects: {
            [key: string]: any[];
        };
    };
    private _parsePrefabs(reader);
    private _writePrefabs(writer);
    private _parsePrefabSet(reader, prefabName);
    private _writePrefabSet(writer, prefabObjects);
    private _parseGameObject(reader);
    private _writeGameObject(writer, gameObject);
    private _parseGameObjectBehavior(reader);
    private _writeGameObjectBehavior(writer, behavior);
}
