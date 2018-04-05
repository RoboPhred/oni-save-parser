
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull
} from "../utils"

import {
    DataReader
} from "../data-reader";

import {
    OniSave
} from "../oni-save";

import {
    TypeDeserializer
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
    private _widthInCells: number | null = null;
    private _heightInCells: number | null = null;
    private _streamed: ReadonlyMap<string, ArrayBufferView> | null = null;

    constructor(
        @inject(TypeDeserializer) private _deserializer: TypeDeserializer
    ) {}

    get widthInCells(): number {
        return ensureNotNull(this._widthInCells);
    }

    get heightInCells(): number {
        return ensureNotNull(this._heightInCells);
    }

    get streamed(): ReadonlyMap<string, ArrayBufferView> {
        return ensureNotNull(this._streamed);
    }

    parse(reader: DataReader) {
        const saveFileRoot = this._deserializer.deserialize(reader, SaveFileRoot);
        this._widthInCells = saveFileRoot.WidthInCells;
        this._heightInCells = saveFileRoot.HeightInCells;
        this._streamed = saveFileRoot.streamed;
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