import { DataReader, DataWriter } from "../binary-serializer";
import { TypeSerializer } from "../type-serializer";
import { OniSaveRoot } from "./services";
export declare class OniSaveRootImpl implements OniSaveRoot {
    private _typeSerializer;
    private _saveFileRoot;
    constructor(_typeSerializer: TypeSerializer);
    readonly widthInCells: number;
    readonly heightInCells: number;
    readonly streamed: ReadonlyMap<string, ArrayBufferView>;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {
        widthInCells: number;
        heightInCells: number;
        streamed: {
            [key: string]: ArrayBufferView;
        };
    };
}
