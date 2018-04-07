
import {
    Identifier
} from "microinject";

import {
    JsonObjectSerializable
} from "../interfaces";

import {
    BinarySerializable
} from "../binary-serializer";

/**
 * ONI assembly Game.GameSaveData
 */
export interface OniGameData extends JsonObjectSerializable, BinarySerializable {
    // TODO: expose fields.
}
export const OniGameData: Identifier<OniGameData> = Symbol("OniGameData");
