import { Identifier } from "microinject";
import { JsonObjectSerializable } from "../interfaces";
import { BinarySerializable } from "../binary-serializer";
/**
 * ONI assembly Game.GameSaveData
 */
export interface OniGameData extends JsonObjectSerializable, BinarySerializable {
}
export declare const OniGameData: Identifier<OniGameData>;
