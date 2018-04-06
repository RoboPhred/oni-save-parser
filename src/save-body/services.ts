
import {
    Identifier
} from "microinject";


import {
    JsonObjectSerializable
} from "../interfaces";

import {
    BinarySerializable
} from "../binary-serializer";

import {
    OniSaveRoot
} from "../save-root";

import {
    OniGameSettings
} from "../game-settings";

import {
    OniGameState
} from "../game-state";


/**
 * Represents the body content of a save file.
 * This contains all content that is not the header or serialization templates.
 * 
 * This is equivalent to the data that is handled by the ONI code ```SaveLoader.Load(IReader)```
 */
export interface OniSaveBody extends JsonObjectSerializable, BinarySerializable {
    readonly saveRoot: OniSaveRoot;
    readonly gameSettings: OniGameSettings;
    readonly gameState: OniGameState;
}
export const OniSaveBody: Identifier<OniSaveBody> = Symbol("OniSaveBody");