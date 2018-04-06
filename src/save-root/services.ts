
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
 * Contains basic world data and additional data streams.
 * Corresponds to Klei.SaveFileRoot
 */
export interface OniSaveRoot extends JsonObjectSerializable, BinarySerializable {
    /**
     * The width of the map in cells.
     */
    readonly widthInCells: number;

    /**
     * The height of the map in cells.
     */
    readonly heightInCells: number;

    /**
     * Binary blob data stored by key in the save file.
     */
    readonly streamed: ReadonlyMap<string, ArrayBufferView>;
}
export const OniSaveRoot: Identifier<OniSaveRoot> = Symbol("OniSaveRoot");