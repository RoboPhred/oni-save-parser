
import {
    TextDecoder
} from "text-encoding";

import {
    injectable,
    inScope
} from "microinject";


import {
    ensureNotNull
} from "../utils";

import {
    JsonObjectSerializable
} from "../interfaces";

import {
    DataReader
} from "../data-reader";

import {
    OniSave
} from "../oni-save";

import {
    OniSaveHeader
} from "./services";


@injectable(OniSaveHeader)
@inScope(OniSave)
export class OniSaveHeaderImpl implements OniSaveHeader, JsonObjectSerializable {

    private _buildVersion: number | null = null;
    private _headerVersion: number | null = null;
    private _isCompressed: boolean | null = null;
    private _gameData: object | null = null;

    get buildVersion(): number {
        return ensureNotNull(this._buildVersion);
    }

    get headerVersion(): number {
        return ensureNotNull(this._headerVersion);
    }

    get isCompressed(): boolean {
        return ensureNotNull(this._isCompressed);
    }

    get gameData(): object {
        return ensureNotNull(this._gameData);
    }

    parse(reader: DataReader) {
        this._buildVersion = reader.readUInt32();
        const headerSize = reader.readUInt32();
        this._headerVersion = reader.readUInt32();
        this._isCompressed = this._headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;

        const data = reader.readBytes(headerSize);
        const dataStr = new TextDecoder("utf-8").decode(data);
        this._gameData = JSON.parse(dataStr);
    }

    toJSON() {
        return {
            buildVersion: this.buildVersion,
            headerVersion: this.headerVersion,
            isCompressed: this.isCompressed,
            gameData: this.gameData
        };
    }
}