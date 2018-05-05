import { DataReader, DataWriter } from "../../../binary-serializer";
import { ParseStepExecutor } from "../../../parse-steps";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameSaveRootInstance } from "../services";
import { GameSaveRoot } from "../interfaces";
export declare class GameSaveRootInstanceImpl implements GameSaveRootInstance {
    private _templateSerializer;
    private _stepExecutor;
    private _data;
    constructor(_templateSerializer: TypeTemplateSerializer, _stepExecutor: ParseStepExecutor);
    readonly widthInCells: number;
    readonly heightInCells: number;
    readonly streamed: {
        [key: string]: Uint8Array;
    };
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    fromJSON(value: GameSaveRoot): void;
    toJSON(): GameSaveRoot;
}
