import { Logger } from "../../../logging";
import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameObjectManager } from "../services";
import { GameObjectPrefabs } from "../interfaces";
export declare class GameObjectManagerImpl implements GameObjectManager {
    private _templateSerializer;
    private _gameObjects;
    private _gameObjectOrdering;
    private _warnExtraniousDataTypes;
    private _logWarn;
    private _logTrace;
    constructor(_templateSerializer: TypeTemplateSerializer, logger?: Logger);
    readonly gameObjects: GameObjectPrefabs;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    fromJSON(gameObjects: GameObjectPrefabs): void;
    toJSON(): GameObjectPrefabs;
    private _parsePrefabSet(reader, prefabName);
    private _writePrefabSet(writer, prefabObjects);
    private _parseGameObject(reader);
    private _writeGameObject(writer, gameObject);
    private _parseGameObjectBehavior(reader);
    private _writeGameObjectBehavior(writer, behavior);
}
