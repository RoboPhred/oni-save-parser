
import {
    inject,
    injectable,
    inScope
} from "microinject";

import {
    ensureNotNull,
    validateDotNetIdentifierName
} from "../../../utils";

import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";

import {
    TypeTemplateSerializer
} from "../type-serializer";

import {
    GameSettingsInstance,
    SaveGameScope
} from "../services";


interface GameSettingsTemplate {
    baseAlreadyCreated: boolean;
    nextUniqueID: number;
    gameID: number;
}
const AssemblyTypeName = "Game+Settings";

@injectable(GameSettingsInstance)
@inScope(SaveGameScope)
export class GameSettingsInstanceImpl implements GameSettingsInstance {
    private _settings: GameSettingsTemplate | null = null;

    constructor(
        @inject(TypeTemplateSerializer) private _templateSerializer: TypeTemplateSerializer,
    ) {}

    get baseAlreadyCreated(): boolean {
        return ensureNotNull(this._settings, "The value has not yet been parsed.").baseAlreadyCreated;
    }

    get nextUniqueID(): number {
        return ensureNotNull(this._settings, "The value has not yet been parsed.").nextUniqueID;
    }

    get gameID(): number {
        return ensureNotNull(this._settings, "The value has not yet been parsed.").gameID;
    }

    parse(reader: DataReader): void {
        const rootName = validateDotNetIdentifierName(reader.readKleiString());
        if (rootName !== AssemblyTypeName) {
            throw new Error(`Failed to parse GameSettings: Expected to find "${AssemblyTypeName}", but got "${rootName}".`);
        }
        this._settings = this._templateSerializer.parseTemplatedType<GameSettingsTemplate>(reader, AssemblyTypeName);
    }

    write(writer: DataWriter): void {
        if (!this._settings) {
            throw new Error("Failed to write GameSettings: Data has not been parsed.");
        }
        writer.writeKleiString(AssemblyTypeName);
        this._templateSerializer.writeTemplatedType(writer, AssemblyTypeName, this._settings);
    }
}
