import { Identifier } from "microinject";
import { JsonObjectSerializable } from "../interfaces";
import { BinarySerializable } from "../binary-serializer";
import { GameObject } from "./interfaces";
/**
 * This is anagolous to the ONI assembly's ```SaveManager``.
 * However, we name it for what it does, because we already
 * have enough things called "save".
 * Everything else called "save" deals with the save file
 * structure, while this explicitly deals with instantiating
 * game objects.
 */
export interface OniGameState extends JsonObjectSerializable, BinarySerializable {
    readonly gameObjects: ReadonlyMap<string, GameObject[]>;
}
export declare const OniGameState: Identifier<OniGameState>;
