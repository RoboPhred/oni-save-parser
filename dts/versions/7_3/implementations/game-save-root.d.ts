import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameSaveRootInstance } from "../services";
export declare class GameSaveRootInstanceImpl implements GameSaveRootInstance {
    private _templateSerializer;
    private _data;
    constructor(_templateSerializer: TypeTemplateSerializer);
    readonly widthInCells: number;
    readonly heightInCells: number;
    readonly streamed: Map<string, Uint8Array>;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
}
