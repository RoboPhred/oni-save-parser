import { Logger } from "../../../logging";
import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameObjectManager } from "../services";
import { GameObject } from "../interfaces";
export declare class GameObjectManagerImpl implements GameObjectManager {
    private _templateSerializer;
    static readonly SAVE_HEADER: string;
    static readonly CURRENT_VERSION_MAJOR: number;
    static readonly CURRENT_VERSION_MINOR: number;
    private _versionMinor;
    private _gameObjects;
    private _gameObjectOrdering;
    private _warnExtraniousDataTypes;
    private _logWarn;
    private _logTrace;
    constructor(_templateSerializer: TypeTemplateSerializer, logger?: Logger);
    readonly gameObjects: Map<string, GameObject[]>;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    private _parsePrefabs(reader);
    private _writePrefabs(writer);
    private _parsePrefabSet(reader, prefabName);
    private _writePrefabSet(writer, prefabObjects);
    private _parseGameObject(reader);
    private _writeGameObject(writer, gameObject);
    private _parseGameObjectBehavior(reader);
    private _writeGameObjectBehavior(writer, behavior);
}
