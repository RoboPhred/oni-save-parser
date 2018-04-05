import { Identifier } from "microinject";
import { Parseable } from "../interfaces";
import { DataReader } from "../data-reader";
export interface OniSaveHeader extends Parseable {
    readonly buildVersion: number;
    readonly headerVersion: number;
    readonly isCompressed: boolean;
    readonly gameData: object;
    parse(reader: DataReader): any;
}
export declare const OniSaveHeader: Identifier<OniSaveHeader>;
