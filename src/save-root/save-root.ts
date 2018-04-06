
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull
} from "../utils"

import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    OniSave
} from "../oni-save";

import {
    TypeReader,
    TypeWriter
} from "../type-templates";

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
        @inject(TypeReader) private _typeReader: TypeReader,
        @inject(TypeWriter) private _typeWriter: TypeWriter
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
        this._saveFileRoot = this._typeReader.deserialize(reader, SaveFileRoot);
    }

    write(writer: DataWriter) {
        this._typeWriter.serialize(writer, SaveFileRoot, this._saveFileRoot);
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