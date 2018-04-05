
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
    OniSaveHeader
} from "../save-header";

import {
    OniSaveData
} from "../save-data";

import {
    TypeDeserializer
} from "../type-templates";

import {
    OniGameState
} from "./services";

@injectable(OniGameState)
@inScope(OniSaveData)
export class OniGameStateImpl implements OniGameState {
    constructor(
        @inject(OniSaveHeader) private _header: OniSaveHeader,
        @inject(TypeDeserializer) private _deserializer: TypeDeserializer
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

    private _parseState(reader: DataReader) {
        // Here begins our equivalent of the ONI SaveLoader.Load(IReader reader)

        // ONI does nothing aside from read this into the ether.
        //  We will check it to ensure our data still looks good up
        //  to this point.
        const worldString = reader.readKleiString();
        if (worldString !== "world") {
            throw new Error(`Failed to parse gamestate: Expected "world" prefix in state data.`);
        }

        const saveFileRoot = this._deserializer.deserialize(reader);
    }
}