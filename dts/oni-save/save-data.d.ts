import { JsonObjectSerializable } from "../interfaces";
import { DataReader } from "../data-reader";
import { TypeTemplateRegistry } from "../type-templates";
import { OniSaveHeader } from "../save-header";
import { OniGameState } from "../game-state";
import { OniSaveData } from "./services";
export declare class OniSaveDataImpl implements OniSaveData, JsonObjectSerializable {
    header: OniSaveHeader;
    templates: TypeTemplateRegistry;
    gameState: OniGameState;
    constructor(header: OniSaveHeader, templates: TypeTemplateRegistry, gameState: OniGameState);
    parse(reader: DataReader): void;
    toJSON(): {
        header: OniSaveHeader;
    };
}
