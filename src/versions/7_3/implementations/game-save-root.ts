import { inject, injectable, inScope } from "microinject";

import { ensureNotNull, validateDotNetIdentifierName } from "../../../utils";

import { DataReader, DataWriter } from "../../../binary-serializer";

import { ParseStepExecutor } from "../../../parse-steps";

import { TypeTemplateSerializer } from "../type-serializer";

import { GameSaveRootInstance, SaveGameScope } from "../services";

import { GameSaveRoot } from "../interfaces";

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
    @inject(TypeTemplateSerializer)
    private _templateSerializer: TypeTemplateSerializer,
    @inject(ParseStepExecutor) private _stepExecutor: ParseStepExecutor
  ) {}

  get widthInCells(): number {
    return ensureNotNull(this._data).WidthInCells;
  }

  get heightInCells(): number {
    return ensureNotNull(this._data).HeightInCells;
  }

  get streamed(): { [key: string]: Uint8Array } {
    const streamed = ensureNotNull(this._data).streamed;
    const obj: { [key: string]: Uint8Array } = {};
    for (let [key, value] of streamed) {
      obj[key] = value;
    }

    return obj;
  }

  parse(reader: DataReader) {
    const rootName = validateDotNetIdentifierName(reader.readKleiString());
    if (rootName !== AssemblyTypeName) {
      throw new Error(
        `Failed to parse GameSaveRoot: Expected to find "${AssemblyTypeName}", but got "${rootName}"`
      );
    }

    this._data = this._stepExecutor.do("save-file-root", () =>
      this._templateSerializer.parseTemplatedType<GameSaveRootTemplate>(
        reader,
        AssemblyTypeName
      )
    );
  }

  write(writer: DataWriter) {
    if (!this._data) {
      throw new Error(
        "Failed to write SaveFileRoot: Data has not been parsed."
      );
    }
    writer.writeKleiString(AssemblyTypeName);

    this._stepExecutor.do("save-file-root", () =>
      this._templateSerializer.writeTemplatedType(
        writer,
        AssemblyTypeName,
        this._data!
      )
    );
  }

  fromJSON(value: GameSaveRoot): void {
    // TODO: validate json value
    const streamed = new Map<string, Uint8Array>();
    for (let key of Object.keys(value.streamed)) {
      streamed.set(key, value.streamed[key]);
    }

    this._data = {
      WidthInCells: value.widthInCells,
      HeightInCells: value.heightInCells,
      streamed
    };
  }

  toJSON(): GameSaveRoot {
    return {
      widthInCells: this.widthInCells,
      heightInCells: this.heightInCells,
      streamed: this.streamed
    };
  }
}
