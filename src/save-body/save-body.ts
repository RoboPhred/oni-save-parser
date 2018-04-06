
import {
    inject,
    injectable,
    inScope
} from "microinject";


import {
    DataReader,
    DataWriter,
    ZlibDataReader,
    ZlibDataWriter
} from "../binary-serializer";

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

    private _writeState(writer: DataWriter): void {
        writer.writeKleiString("world");
        this.saveRoot.write(writer);
        this.gameSettings.write(writer);
        this.gameState.write(writer);
    }
}
