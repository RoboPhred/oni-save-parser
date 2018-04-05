
import {
    Identifier
} from "microinject";

import {
    JsonObjectSerializable,
    Parseable
} from "../interfaces";

import {
    OniSaveHeader
} from "../save-header";

import {
    OniSaveBody
} from "../save-body";


export interface OniSave extends JsonObjectSerializable, Parseable {
    readonly header: OniSaveHeader;
    readonly body: OniSaveBody;
}
export const OniSave: Identifier<OniSave> = Symbol("OniSave");