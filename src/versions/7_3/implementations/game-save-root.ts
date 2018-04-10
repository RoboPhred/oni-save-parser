
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull,
    validateDotNetIdentifierName
} from "../../../utils"

import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";

import {
    TypeTemplateSerializer
} from "../type-serializer";

import {
    GameSaveRootInstance,
    SaveGameScope
} from "../services";


const AssemblyTypeName = "Klei.SaveFileRoot";

interface GameSaveRootTemplate {
    WidthInCells: number;
    HeightInCells: number;
    streamed: Map<string, Uint8Array>;
}

@injectable(GameSaveRootInstance)
@inScope(SaveGameScope)
export class GameSaveRootInstanceImpl implements GameSaveRootInstance {
    private _data: GameSaveRootTemplate | null = null;

    constructor(
        @inject(TypeTemplateSerializer) private _templateSerializer: TypeTemplateSerializer,
    ) {}

    get widthInCells(): number {
        return ensureNotNull(this._data).WidthInCells;
    }

    get heightInCells(): number {
        return ensureNotNull(this._data).HeightInCells;
    }

    get streamed(): Map<string, Uint8Array> {
        return ensureNotNull(this._data).streamed;
    }

    parse(reader: DataReader) {
        const rootName = validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== AssemblyTypeName) {
            throw new Error(`Failed to parse GameSaveRoot: Expected to find "${AssemblyTypeName}", but got "${rootName}"`);
        }
        this._data = this._templateSerializer.parseTemplatedType<GameSaveRootTemplate>(reader, AssemblyTypeName);
    }

    write(writer: DataWriter) {
        if (!this._data) {
            throw new Error("Failed to write SaveFileRoot: Data has not been parsed.");
        }
        writer.writeKleiString(AssemblyTypeName);
        this._templateSerializer.writeTemplatedType(writer, AssemblyTypeName, this._data);
    }
}
