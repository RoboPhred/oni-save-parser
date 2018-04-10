
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
    TypeSerializer
} from "../type-serializer";

import {
    SaveFileRoot
} from "../assembly-types";

import {
    OniSaveRoot
} from "./services";


@injectable(OniSaveRoot)
@inScope(OniSave)
export class OniSaveRootImpl implements OniSaveRoot {
    private _saveFileRoot: SaveFileRoot | null = null;

    constructor(
        @inject(TypeSerializer) private _typeSerializer: TypeSerializer,
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
        this._saveFileRoot = this._typeSerializer.parseTemplatedType(reader, SaveFileRoot) as SaveFileRoot;
    }

    write(writer: DataWriter) {
        if (!this._saveFileRoot) {
            throw new Error("Failed to write SaveFileRoot: No root loaded.");
        }
        writer.writeKleiString(SaveFileRoot);
        this._typeSerializer.writeTemplatedType(writer, SaveFileRoot, this._saveFileRoot);
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