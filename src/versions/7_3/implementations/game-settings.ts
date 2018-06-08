import { inject, injectable, inScope } from "microinject";

import { ensureNotNull, validateDotNetIdentifierName } from "../../../utils";

import { DataReader, DataWriter } from "../../../binary-serializer";

import { TypeTemplateSerializer } from "../type-serializer";

import { GameSettingsInstance, SaveGameScope } from "../services";
import { GameSettings } from "..";

interface GameSettingsTemplate {
  baseAlreadyCreated: boolean;
  nextUniqueID: number;
  gameID: number;
}
const AssemblyTypeName = "Game+Settings";

@injectable(GameSettingsInstance)
@inScope(SaveGameScope)
export class GameSettingsInstanceImpl implements GameSettingsInstance {
  private _data: GameSettingsTemplate | null = null;

  constructor(
    @inject(TypeTemplateSerializer)
    private _templateSerializer: TypeTemplateSerializer
  ) {}

  get baseAlreadyCreated(): boolean {
    return ensureNotNull(this._data, "The value has not yet been parsed.")
      .baseAlreadyCreated;
  }

  get nextUniqueID(): number {
    return ensureNotNull(this._data, "The value has not yet been parsed.")
      .nextUniqueID;
  }

  get gameID(): number {
    return ensureNotNull(this._data, "The value has not yet been parsed.")
      .gameID;
  }

  parse(reader: DataReader): void {
    const rootName = validateDotNetIdentifierName(reader.readKleiString());
    if (rootName !== AssemblyTypeName) {
      throw new Error(
        `Failed to parse GameSettings: Expected to find "${AssemblyTypeName}", but got "${rootName}".`
      );
    }
    this._data = this._templateSerializer.parseTemplatedType<
      GameSettingsTemplate
    >(reader, AssemblyTypeName);
  }

  write(writer: DataWriter): void {
    if (!this._data) {
      throw new Error("Failed to write GameSettings: Data has not been set.");
    }
    writer.writeKleiString(AssemblyTypeName);
    this._templateSerializer.writeTemplatedType(
      writer,
      AssemblyTypeName,
      this._data
    );
  }

  fromJSON(value: any): void {
    // TODO: validate json value
    this._data = { ...value };
  }

  toJSON(): GameSettings {
    if (!this._data) {
      throw new Error(
        "Failed to serialize GameSettings json: Data has not been set."
      );
    }
    return { ...this._data };
  }
}
