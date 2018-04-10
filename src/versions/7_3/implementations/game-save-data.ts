
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    Vector2I
} from "../../../interfaces";

import {
    validateDotNetIdentifierName,
    ensureNotNull
} from "../../../utils";

import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";

import {
    TypeTemplateSerializer
} from "../type-serializer";

import {
    GameSaveDataInstance,
    SaveGameScope
} from "../services";

import {
    GameSaveData
} from "../interfaces";


const AssemblyTypeName = "Game+GameSaveData";

@injectable(GameSaveDataInstance)
@inScope(SaveGameScope)
export class GameSaveDataInstanceImpl implements GameSaveDataInstance {
    private _data: GameSaveData | undefined;

    constructor(
        @inject(TypeTemplateSerializer) private _templateSerializer: TypeTemplateSerializer
    ) { }

    get gasConduitFlow(): any {
        return ensureNotNull(this._data).gasConduitFlow;
    }

    get liquidConduitFlow(): any {
        return ensureNotNull(this._data).liquidConduitFlow;
    }

    get simActiveRegionMin(): Vector2I {
        return ensureNotNull(this._data).simActiveRegionMin;
    }

    get simActiveRegionMax(): Vector2I {
        return ensureNotNull(this._data).simActiveRegionMax;
    }

    get fallingWater(): any {
        return ensureNotNull(this._data).fallingWater;
    }

    get unstableGround(): any {
        return ensureNotNull(this._data).unstableGround;
    }

    get worldDetail(): any {
        return ensureNotNull(this._data).worldDetail;
    }

    get customGameSettings(): any {
        return ensureNotNull(this._data).customGameSettings;
    }

    get debugWasUsed(): boolean {
        return ensureNotNull(this._data).debugWasUsed;
    }

    get autoPrioritizeRoles(): any {
        return ensureNotNull(this._data).autoPrioritizeRoles;
    }

    get advancedPersonalPriorities(): boolean {
        return ensureNotNull(this._data).advancedPersonalPriorities;
    }

    parse(reader: DataReader): void {
        const typeName = validateDotNetIdentifierName(reader.readKleiString());
        if (typeName !== AssemblyTypeName) {
            throw new Error(`Failed to parse GameSaveData: Expected to find type name "${AssemblyTypeName}", but got "${typeName}".`);
        }
        this._data = this._templateSerializer.parseTemplatedType<GameSaveData>(reader, AssemblyTypeName);
        if (!this._data) {
            throw new Error("Failed to parse GameSaveData: Parsed template type data was a null value.");
        }
    }

    write(writer: DataWriter): void {
        if (!this._data) {
            throw new TypeError("Failed to write GameStateData: Data has not been parsed.");
        }
        writer.writeKleiString(AssemblyTypeName);
        this._templateSerializer.writeTemplatedType(writer, AssemblyTypeName, this._data);
    }
}
