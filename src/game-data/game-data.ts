
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
    OniGameData
} from "./services";


@injectable(OniGameData)
@inScope(OniSave)
export class OniGameDataImpl implements OniGameData {
    private _data: object | null = null;

    constructor(
        @inject(TypeReader) private _typeReader: TypeReader,
        @inject(TypeWriter) private _typeWriter: TypeWriter
    ) {}

    parse(reader: DataReader): void {
        this._data = this._typeReader.deserialize(reader, "Game+GameSaveData");
    }

    write(writer: DataWriter): void {
        this._typeWriter.serialize(writer, "Game+GameSaveData", this._data);
    }

    toJSON() {
        // TODO
        return {...this._data};
    }
}