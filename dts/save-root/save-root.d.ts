import { DataReader } from "../data-reader";
import { TypeDeserializer } from "../type-templates";
import { OniSaveRoot } from "./services";
export declare class OniSaveRootImpl implements OniSaveRoot {
    private _deserializer;
    private _widthInCells;
    private _heightInCells;
    private _streamed;
    constructor(_deserializer: TypeDeserializer);
    readonly widthInCells: number;
    readonly heightInCells: number;
    readonly streamed: ReadonlyMap<string, ArrayBufferView>;
    parse(reader: DataReader): void;
    toJSON(): {
        widthInCells: number;
        heightInCells: number;
        streamed: {
            [key: string]: ArrayBufferView;
        };
    };
}
