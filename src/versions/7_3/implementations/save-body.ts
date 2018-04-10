
import {
    inject,
    injectable,
    inScope
} from "microinject";


import {
    ArrayDataWriter,
    DataReader,
    DataWriter,
    ZlibDataReader,
    ZlibDataWriter
} from "../../../binary-serializer";

import {
    ensureNotNull
} from "../../../utils";


import {
    SaveBodyInstance,
    SaveGameHeaderInstance,
    GameSaveRootInstance,
    GameSettingsInstance,
    GameObjectManager,
    GameSaveDataInstance,
    SaveGameScope
} from "../services";

import {
    GameSaveRoot,
    GameSettings,
    GameObject,
    GameSaveData
} from "../interfaces";


@injectable(SaveBodyInstance)
@inScope(SaveGameScope)
export class SaveBodyInstanceImpl implements SaveBodyInstance {

    constructor(
        @inject(SaveGameHeaderInstance) private _header: SaveGameHeaderInstance,
        @inject(GameSaveRootInstance) private _saveRoot: GameSaveRootInstance,
        @inject(GameSettingsInstance) private _gameSettings: GameSettingsInstance,
        @inject(GameObjectManager) private _gameObjectManager: GameObjectManager,
        @inject(GameSaveDataInstance) private _gameData: GameSaveDataInstance
    ) { }

    get saveRoot(): GameSaveRoot {
        return ensureNotNull(this._saveRoot);
    }

    get gameSettings(): GameSettings {
        return ensureNotNull(this._gameSettings);
    }

    get gameObjects(): Map<string, GameObject[]> {
        return ensureNotNull(this._gameObjectManager).gameObjects;
    }

    get gameData(): GameSaveData {
        return ensureNotNull(this._gameData);
    }

    parse(reader: DataReader): void {
        if (this._header.isCompressed) {
            const deflatedReader = new ZlibDataReader(reader.viewAllBytes());
            this._parseState(deflatedReader);
        }
        else {
            this._parseState(reader);
        }
    }

    write(writer: DataWriter): void {
        if (this._header.isCompressed) {
            const deflateWriter = new ZlibDataWriter();
            this._writeState(deflateWriter);
            writer.writeBytes(deflateWriter.getBytesView());
        }
        else {
            this._writeState(writer);
        }
    }

    private _parseState(reader: DataReader) {
        // Here begins our equivalent of the ONI SaveLoader.Load(IReader reader)

        // ONI does nothing aside from read this into the ether.
        //  We will check it to ensure our data still looks good up
        //  to this point.
        const worldString = reader.readKleiString();
        if (worldString !== "world") {
            throw new Error(`Failed to parse SaveBody: Expected "world" prefix.`);
        }

        this._saveRoot.parse(reader);
        this._gameSettings.parse(reader);
        this._gameObjectManager.parse(reader);
        this._gameData.parse(reader);
    }

    private _writeState(writer: DataWriter): void {
        writer.writeKleiString("world");

        this._saveRoot.write(writer);
        this._gameSettings.write(writer);
        this._gameObjectManager.write(writer);
        this._gameData.write(writer);
    }
}
