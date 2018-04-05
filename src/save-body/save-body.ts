
import {
    inject,
    injectable,
    inScope
} from "microinject";


import {
    DataReader,
    ZlibDataReader
} from "../data-reader";

import {
    OniSave
} from "../oni-save";

import {
    OniSaveBody
} from "./services";

import {
    OniSaveHeader
} from "../save-header";

import {
    OniSaveRoot
} from "../save-root";

import {
    OniGameSettings
} from "../game-settings";

import {
    OniGameState
} from "../game-state";




@injectable(OniSaveBody)
@inScope(OniSave)
export class OniSaveBodyImpl implements OniSaveBody {

    constructor(
        @inject(OniSaveHeader) private _header: OniSaveHeader,
        @inject(OniSaveRoot) public saveRoot: OniSaveRoot,
        @inject(OniGameSettings) public gameSettings: OniGameSettings,
        @inject(OniGameState) public gameState: OniGameState
    ) {}

    parse(reader: DataReader): void {
        if (this._header.isCompressed) {
            const deflatedReader = new ZlibDataReader(reader.readAllBytes());
            this._parseState(deflatedReader);
        }
        else {
            this._parseState(reader);
        }
    }

    toJSON() {
        return {
            saveRoot: this.saveRoot.toJSON(),
            gameSettings: this.gameSettings.toJSON(),
            gameState: this.gameState.toJSON()
        };
    }

    private _parseState(reader: DataReader) {
        // Here begins our equivalent of the ONI SaveLoader.Load(IReader reader)

        // ONI does nothing aside from read this into the ether.
        //  We will check it to ensure our data still looks good up
        //  to this point.
        const worldString = reader.readKleiString();
        if (worldString !== "world") {
            throw new Error(`Failed to parse gamestate: Expected "world" prefix in state data.`);
        }

        this.saveRoot.parse(reader);
        this.gameSettings.parse(reader);
        this.gameState.parse(reader);
    }
}
