
import {
    Identifier
} from "microinject";

import {
    JsonObjectSerializable
} from "../interfaces";

import {
    BinarySerializable
} from "../binary-serializer";


export interface OniSaveHeader extends JsonObjectSerializable, BinarySerializable {
    readonly buildVersion: number;
    readonly headerVersion: number;
    readonly isCompressed: boolean;
    readonly gameData: object;
}
export const OniSaveHeader: Identifier<OniSaveHeader> = Symbol("OniSaveHeader");