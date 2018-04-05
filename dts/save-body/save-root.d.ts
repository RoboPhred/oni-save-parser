import { DataReader } from "../data-reader";
import { OniSaveHeader } from "../save-header";
import { OniSaveBody } from "./services";
export declare class OniSaveRootImpl implements OniSaveBody {
    private _header;
    constructor(_header: OniSaveHeader);
    parse(reader: DataReader): void;
    private _parseState(reader);
}
