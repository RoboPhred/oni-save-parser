import { Identifier } from "microinject";
import { Parseable } from "../interfaces";
import { OniSaveHeader } from "../save-header";
export interface OniSaveData extends Parseable {
    readonly header: OniSaveHeader;
}
export declare const OniSaveData: Identifier<OniSaveData>;
