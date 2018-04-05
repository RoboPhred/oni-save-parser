
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull
} from "../utils";

import {
    DataReader
} from "../data-reader";

import {
    TypeDeserializer
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
    private _baseAlreadyCreated: boolean | null = null;
    private _nextUniqueID: number | null = null;
    private _gameID: number | null = null;

    constructor(
        @inject(TypeDeserializer) private _deserializer: TypeDeserializer
    ) {}

    get baseAlreadyCreated(): boolean {
        return ensureNotNull(this._baseAlreadyCreated, "The value has not yet been parsed.");
    }

    get nextUniqueID(): number {
        return ensureNotNull(this._nextUniqueID, "The value has not yet been parsed.");
    }

    get gameID(): number {
        return ensureNotNull(this._gameID, "The value has not yet been parsed.");
    }

    parse(reader: DataReader): void {
        const settings = this._deserializer.deserialize(reader, GameSettings);
        this._baseAlreadyCreated = settings.baseAlreadyCreated;
        this._nextUniqueID = settings.nextUniqueID;
        this._gameID = settings.gameID;
    }

    toJSON() {
        return {
            baseAlreadyCreated: this.baseAlreadyCreated,
            nextUniqueID: this.nextUniqueID,
            gameID: this.gameID
        };
    }
}