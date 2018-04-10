
import {
    TextDecoder,
    TextEncoder
} from "text-encoding";

import {
    injectable,
    inScope
} from "microinject";


import {
    ensureNotNull
} from "../../../utils";

import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";

import {
    SaveGameHeaderInstance,
    SaveGameScope
} from "../services";

import {
    SaveGameInfo
} from "../interfaces";


@injectable(SaveGameHeaderInstance)
@inScope(SaveGameScope)
export class SaveGameHeaderInstanceImpl implements SaveGameHeaderInstance {

    private _buildVersion: number | null = null;
    private _headerVersion: number | null = null;
    private _isCompressed: boolean | null = null;
    private _gameInfo: SaveGameInfo | null = null;

    get buildVersion(): number {
        return ensureNotNull(this._buildVersion);
    }

    get headerVersion(): number {
        return ensureNotNull(this._headerVersion);
    }

    get isCompressed(): boolean {
        return ensureNotNull(this._isCompressed);
    }

    get gameInfo(): SaveGameInfo {
        return ensureNotNull(this._gameInfo);
    }

    parse(reader: DataReader) {
        this._buildVersion = reader.readUInt32();
        const headerSize = reader.readUInt32();
        this._headerVersion = reader.readUInt32();
        this._isCompressed = this._headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;

        const infoBytes = reader.viewBytes(headerSize);
        const infoStr = new TextDecoder("utf-8").decode(infoBytes);
        this._gameInfo = JSON.parse(infoStr);
    }

    write(writer: DataWriter) {
        const buildVersion = ensureNotNull(this._buildVersion);
        const headerVersion = ensureNotNull(this._headerVersion);
        const isCompressed = ensureNotNull(this._isCompressed);

        const infoStr = JSON.stringify(ensureNotNull(this._gameInfo));
        const headerBytes = new TextEncoder("utf-8").encode(infoStr);

        writer.writeUInt32(buildVersion);
        writer.writeUInt32(headerBytes.byteLength);
        writer.writeUInt32(headerVersion);
        if (headerVersion >= 1) {
            writer.writeUInt32(isCompressed ? 1 : 0);
        }

        writer.writeBytes(headerBytes.buffer);
    }

    toJSON() {
        return {
            buildVersion: this.buildVersion,
            headerVersion: this.headerVersion,
            isCompressed: this.isCompressed,
            gameData: this.gameInfo
        };
    }
}