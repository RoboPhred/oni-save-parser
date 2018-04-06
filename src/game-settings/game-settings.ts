
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull
} from "../utils";

import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    TypeReader,
    TypeWriter
} from "../type-templates";

import {
    OniSave
} from "../oni-save";

import {
    OniGameSettings
} from "./services";

import {
    GameSettings
} from "../assembly-types";


@injectable(OniGameSettings)
@inScope(OniSave)
export class OniGameSettingsImpl implements OniGameSettings {
    private _settings: GameSettings | null = null;

    constructor(
        @inject(TypeReader) private _typeReader: TypeReader,
        @inject(TypeWriter) private _typeWriter: TypeWriter
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
        this._settings = this._typeReader.deserialize(reader, GameSettings);
    }

    write(writer: DataWriter): void {
        this._typeWriter.serialize(writer, GameSettings, this._settings);
    }

    toJSON() {
        return {
            baseAlreadyCreated: this.baseAlreadyCreated,
            nextUniqueID: this.nextUniqueID,
            gameID: this.gameID
        };
    }
}