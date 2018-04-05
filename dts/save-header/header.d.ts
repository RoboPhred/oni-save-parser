import { JsonObjectSerializable } from "../interfaces";
import { DataReader } from "../data-reader";
import { OniSaveHeader } from "./services";
export declare class OniSaveHeaderImpl implements OniSaveHeader, JsonObjectSerializable {
    buildVersion: number;
    headerVersion: number;
    isCompressed: boolean;
    gameData: object;
    parse(reader: DataReader): void;
    toJSON(): {
        buildVersion: number;
        headerVersion: number;
        isCompressed: boolean;
        gameData: object;
    };
}
