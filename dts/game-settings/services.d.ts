import { Identifier } from "microinject";
import { JsonObjectSerializable, Parseable } from "../interfaces";
export interface OniGameSettings extends JsonObjectSerializable, Parseable {
    readonly baseAlreadyCreated: boolean;
    readonly nextUniqueID: number;
    readonly gameID: number;
}
export declare const OniGameSettings: Identifier<OniGameSettings>;
