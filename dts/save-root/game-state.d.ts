import { DataReader } from "../data-reader";
import { OniSaveHeader } from "../save-header";
import { TypeDeserializer } from "../type-templates";
import { OniGameState } from "./services";
export declare class OniGameStateImpl implements OniGameState {
    private _header;
    private _deserializer;
    constructor(_header: OniSaveHeader, _deserializer: TypeDeserializer);
    parse(reader: DataReader): void;
    private _parseState(reader);
}
