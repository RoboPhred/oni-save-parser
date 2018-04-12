
import {
    inject,
    injectable,
    inScope,
    optional
} from "microinject";


import {
    ArrayDataWriter,
    DataReader,
    DataWriter,
    ZlibDataReader,
    ZlibDataWriter
} from "../../../binary-serializer";

import { Logger } from "../../../logging";

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
    GameObjectPrefabs,
    GameObject,
    GameSaveData,
    SaveBody
} from "../interfaces";


@injectable(SaveBodyInstance)
@inScope(SaveGameScope)
export class SaveBodyInstanceImpl implements SaveBodyInstance {
    static readonly SAVE_HEADER = "KSAV";

    static readonly CURRENT_VERSION_MAJOR = 7;
    static readonly CURRENT_VERSION_MINOR = 3;

    private _versionMinor: number | null = null;

    constructor(
        @inject(SaveGameHeaderInstance) private _header: SaveGameHeaderInstance,
        @inject(GameSaveRootInstance) private _saveRoot: GameSaveRootInstance,
        @inject(GameSettingsInstance) private _gameSettings: GameSettingsInstance,
        @inject(GameObjectManager) private _gameObjectManager: GameObjectManager,
        @inject(GameSaveDataInstance) private _gameData: GameSaveDataInstance,
        @inject(Logger) @optional() private _logger?: Logger
    ) { }

    get saveRoot(): GameSaveRoot {
        return ensureNotNull(this._saveRoot);
    }

    get gameSettings(): GameSettings {
        return ensureNotNull(this._gameSettings);
    }

    get versionMajor() {
        return SaveBodyInstanceImpl.CURRENT_VERSION_MAJOR;
    }
    
    get versionMinor() {
        return ensureNotNull(this._versionMinor);
    }

    get gameObjects(): GameObjectPrefabs {
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


        const expectedHeader = SaveBodyInstanceImpl.SAVE_HEADER;
        const header = reader.readChars(expectedHeader.length);
        if (header !== expectedHeader) {
            throw new Error(`Failed to parse SaveBody: Expected "${expectedHeader}" but got "${header}" (${Array.from(header).map(x => x.charCodeAt(0))})`);
        }

        const expectedMajor = SaveBodyInstanceImpl.CURRENT_VERSION_MAJOR;
        const expectedMinor = SaveBodyInstanceImpl.CURRENT_VERSION_MINOR;

        const versionMajor = reader.readInt32();
        const versionMinor = reader.readInt32();

        if (versionMajor !== expectedMajor) {
            throw new Error(`Failed to parse SaveBody: Version mismatch: Expected major version ${expectedMajor} but got ${versionMajor}.`);
        }

        if (versionMinor > expectedMinor) {
            // If they stick to semver, then minor changes should in theory be backwards compatible with older versions.
            //  This means its likely we can parse this correctly, but not guarenteed.
            // It's worth noting that the ONI itself will refuse to load a minor version higher than it understands.
            if (this._logger) this._logger.warn(`SaveBody version ${versionMajor}.${versionMinor} has a higher minor version than expected ${expectedMajor}.${expectedMinor}.  Problems may occur with parsing.`);
        }

        this._versionMinor = versionMinor;

        this._gameObjectManager.parse(reader);
        this._gameData.parse(reader);
    }

    private _writeState(writer: DataWriter): void {
        if (!this._versionMinor) {
            throw new Error(`Failed to write SaveBody: Data has not been loaded.`);
        }

        writer.writeKleiString("world");

        this._saveRoot.write(writer);
        this._gameSettings.write(writer);

        writer.writeChars(SaveBodyInstanceImpl.SAVE_HEADER);
        writer.writeInt32(SaveBodyInstanceImpl.CURRENT_VERSION_MAJOR);
        writer.writeInt32(this._versionMinor);

        this._gameObjectManager.write(writer);
        this._gameData.write(writer);
    }

    fromJSON(value: SaveBody): void {
        if (value.versionMajor !== SaveBodyInstanceImpl.CURRENT_VERSION_MAJOR) {
            throw new Error(`Failed to parse SaveBody: Version mismatch: Expected major version ${SaveBodyInstanceImpl.CURRENT_VERSION_MAJOR} but got ${value.versionMajor}.`);
        }
        
        // TODO: validate json value
        this._saveRoot.fromJSON(value.saveRoot);
        this._gameSettings.fromJSON(value.gameSettings);
        this._versionMinor = value.versionMinor;
        this._gameObjectManager.fromJSON(value.gameObjects);
        this._gameData.fromJSON(value.gameData);
    }

    toJSON(): SaveBody {
        if (!this._versionMinor) {
            throw new Error(`Failed to serialize SaveBody: Data has not been loaded.`);
        }

        return {
            saveRoot: this._saveRoot.toJSON(),
            gameSettings: this._gameSettings.toJSON(),
            versionMajor: SaveBodyInstanceImpl.CURRENT_VERSION_MAJOR,
            versionMinor: this._versionMinor,
            gameObjects: this._gameObjectManager.toJSON(),
            gameData: this._gameData.toJSON()
        };
    }
}
