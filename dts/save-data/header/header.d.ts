import { JsonObjectSerializable } from "../../interfaces";
import { DataReader } from "../../data-reader";
import { OniSaveHeader } from "./interfaces";
export declare class OniSaveHeaderImpl implements OniSaveHeader, JsonObjectSerializable {
    buildVersion: number;
    headerVersion: number;
    isCompressed: boolean;
    gameData: object;
    static parse(reader: DataReader): OniSaveHeaderImpl;
    constructor(buildVersion: number, headerVersion: number, isCompressed: boolean, gameData: object);
    toJSON(): {
        buildVersion: number;
        headerVersion: number;
        isCompressed: boolean;
        gameData: object;
    };
}
