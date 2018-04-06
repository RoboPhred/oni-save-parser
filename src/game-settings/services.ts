
import {
    Identifier
} from "microinject";

import {
    JsonObjectSerializable
} from "../interfaces";

import {
    BinarySerializable
} from "../binary-serializer";


export interface OniGameSettings extends JsonObjectSerializable, BinarySerializable {
    readonly baseAlreadyCreated: boolean;
    readonly nextUniqueID: number;
    readonly gameID: number;
}
export const OniGameSettings: Identifier<OniGameSettings> = Symbol("OniGameSettings");
