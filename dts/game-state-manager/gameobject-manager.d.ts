import { DataReader } from "../data-reader";
import { OniGameStateManager } from "./services";
export declare class OniGameStateManagerImpl implements OniGameStateManager {
    static readonly SAVE_HEADER: string;
    static readonly CURRENT_VERSION_MAJOR: number;
    static readonly CURRENT_VERSION_MINOR: number;
    parse(reader: DataReader): void;
}
