import { AssemblyTypeName } from "../interfaces";
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
export declare const SaveFileRoot: AssemblyTypeName<SaveFileRoot>;
