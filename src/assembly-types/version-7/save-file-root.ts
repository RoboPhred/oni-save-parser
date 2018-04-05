
import {
    AssemblyTypeName
} from "../interfaces";

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
export const SaveFileRoot: AssemblyTypeName<SaveFileRoot> = "Klei.SaveFileRoot";