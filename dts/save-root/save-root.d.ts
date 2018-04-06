import { DataReader, DataWriter } from "../binary-serializer";
import { TypeReader, TypeWriter } from "../type-templates";
import { OniSaveRoot } from "./services";
export declare class OniSaveRootImpl implements OniSaveRoot {
    private _typeReader;
    private _typeWriter;
    private _saveFileRoot;
    constructor(_typeReader: TypeReader, _typeWriter: TypeWriter);
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
