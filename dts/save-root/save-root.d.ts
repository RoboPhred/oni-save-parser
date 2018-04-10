import { DataReader, DataWriter } from "../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { OniSaveRoot } from "./services";
/**
 * ONI assembly object.
 * Namespace: ```Klei```
 * Class: ```SaveFileRoot```
 */
export interface SaveFileRoot {
    WidthInCells: number;
    HeightInCells: number;
    streamed: Map<string, ArrayBufferView>;
}
export declare const SaveFileRoot = "Klei.SaveFileRoot";
export declare class OniSaveRootImpl implements OniSaveRoot {
    private _templateSerializer;
    private _saveFileRoot;
    constructor(_templateSerializer: TypeTemplateSerializer);
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
