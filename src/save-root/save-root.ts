
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull,
    validateDotNetIdentifierName
} from "../utils"

import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    OniSave
} from "../oni-save";

import {
    TypeTemplateSerializer
} from "../type-serializer";

import {
    OniSaveRoot
} from "./services";


/**
 * ONI assembly object.
 * Namespace: ```Klei```
 * Class: ```SaveFileRoot```
 */
export interface SaveFileRoot {
    WidthInCells: number;
    HeightInCells: number;
    streamed: Map<string, ArrayBufferView>;
}
export const SaveFileRoot = "Klei.SaveFileRoot";


@injectable(OniSaveRoot)
@inScope(OniSave)
export class OniSaveRootImpl implements OniSaveRoot {
    private _saveFileRoot: SaveFileRoot | null = null;

    constructor(
        @inject(TypeTemplateSerializer) private _templateSerializer: TypeTemplateSerializer,
    ) {}

    get widthInCells(): number {
        return ensureNotNull(this._saveFileRoot).WidthInCells;
    }

    get heightInCells(): number {
        return ensureNotNull(this._saveFileRoot).HeightInCells;
    }

    get streamed(): ReadonlyMap<string, ArrayBufferView> {
        return ensureNotNull(this._saveFileRoot).streamed;
    }

    parse(reader: DataReader) {
        const rootName = validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== SaveFileRoot) {
            throw new Error(`Expected to find "${SaveFileRoot}", but got "${rootName}"`);
        }
        this._saveFileRoot = this._templateSerializer.parseTemplatedType<SaveFileRoot>(reader, SaveFileRoot);
    }

    write(writer: DataWriter) {
        if (!this._saveFileRoot) {
            throw new Error("Failed to write SaveFileRoot: No root loaded.");
        }
        writer.writeKleiString(SaveFileRoot);
        this._templateSerializer.writeTemplatedType(writer, SaveFileRoot, this._saveFileRoot);
    }

    toJSON() {
        const streamed: {[key: string]: ArrayBufferView} = {};
        for(let pair of this.streamed) {
            streamed[pair[0]] = pair[1];
        }

        return {
            widthInCells: this.widthInCells,
            heightInCells: this.heightInCells,
            streamed
        };
    }
}