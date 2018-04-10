import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameSaveRootInstance } from "../services";
import { GameSaveRoot } from "..";
export declare class GameSaveRootInstanceImpl implements GameSaveRootInstance {
    private _templateSerializer;
    private _data;
    constructor(_templateSerializer: TypeTemplateSerializer);
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
