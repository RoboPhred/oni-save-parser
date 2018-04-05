
import {
    TextDecoder
} from "text-encoding";

import {
    injectable,
    inScope
} from "microinject";


import {
    JsonObjectSerializable
} from "../interfaces";

import {
    DataReader
} from "../data-reader";

import {
    OniSaveData
} from "../save-data";

import {
    OniSaveHeader
} from "./services";


@injectable(OniSaveHeader)
@inScope(OniSaveData)
export class OniSaveHeaderImpl implements OniSaveHeader, JsonObjectSerializable {

    buildVersion: number;
    headerVersion: number;
    isCompressed: boolean;
    gameData: object;

    parse(reader: DataReader) {
        this.buildVersion = reader.readUInt32();
        const headerSize = reader.readUInt32();
        this.headerVersion = reader.readUInt32();
        this.isCompressed = this.headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;

        const data = reader.readBytes(headerSize);
        const dataStr = new TextDecoder("utf-8").decode(data);
        this.gameData = JSON.parse(dataStr);
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