
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
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
    OniGameData
} from "./services";

const GameStateData = "Game+GameSaveData";

@injectable(OniGameData)
@inScope(OniSave)
export class OniGameDataImpl implements OniGameData {
    private _data: object | null = null;

    constructor(
        @inject(TypeSerializer) private _typeSerializer: TypeSerializer
    ) { }

    parse(reader: DataReader): void {
        const rootName = validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== GameStateData) {
            throw new Error(`Expected to find "${GameStateData}", but got "${rootName}"`);
        }
        this._data = this._typeSerializer.parseTemplatedType(reader, GameStateData);
    }

    write(writer: DataWriter): void {
        if (!this._data) {
            throw new Error("Failed to write GameStateData: No data loaded.");
        }
        writer.writeKleiString(GameStateData);
        this._typeSerializer.writeTemplatedType(writer, GameStateData, this._data);
    }

    toJSON() {
        // TODO
        return {...this._data};
    }
}