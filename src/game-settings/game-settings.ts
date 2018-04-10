
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull,
    validateDotNetIdentifierName
} from "../utils";

import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    TypeSerializer
} from "../type-serializer";

import {
    OniSave
} from "../oni-save";

import {
    OniGameSettings
} from "./services";


interface GameSettings {
    baseAlreadyCreated: boolean;
    nextUniqueID: number;
    gameID: number;
}
const GameSettings = "Game+Settings";

@injectable(OniGameSettings)
@inScope(OniSave)
export class OniGameSettingsImpl implements OniGameSettings {
    private _settings: GameSettings | null = null;

    constructor(
        @inject(TypeSerializer) private _typeSerializer: TypeSerializer,
    ) {}

    get baseAlreadyCreated(): boolean {
        return ensureNotNull(this._settings, "The value has not yet been parsed.").baseAlreadyCreated;
    }

    get nextUniqueID(): number {
        return ensureNotNull(this._settings, "The value has not yet been parsed.").nextUniqueID;
    }

    get gameID(): number {
        return ensureNotNull(this._settings, "The value has not yet been parsed.").gameID;
    }

    parse(reader: DataReader): void {
        const rootName = validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== GameSettings) {
            throw new Error(`Expected to find "${GameSettings}", but got "${rootName}"`);
        }
        this._settings = this._typeSerializer.parseTemplatedType<GameSettings>(reader, GameSettings);
    }

    write(writer: DataWriter): void {
        if (!this._settings) {
            throw new Error("Failed to write GameSettings: No game settings loaded.");
        }
        writer.writeKleiString(GameSettings);
        this._typeSerializer.writeTemplatedType(writer, GameSettings, this._settings);
    }

    toJSON() {
        return {
            baseAlreadyCreated: this.baseAlreadyCreated,
            nextUniqueID: this.nextUniqueID,
            gameID: this.gameID
        };
    }
}
