import { Identifier } from "microinject";
import { JsonObjectSerializable, Parseable } from "../interfaces";
import { DataReader } from "../data-reader";
export interface OniSaveHeader extends JsonObjectSerializable, Parseable {
    readonly buildVersion: number;
    readonly headerVersion: number;
    readonly isCompressed: boolean;
    readonly gameData: object;
    parse(reader: DataReader): void;
}
export declare const OniSaveHeader: Identifier<OniSaveHeader>;
