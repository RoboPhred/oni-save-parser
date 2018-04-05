
import {
    asScope,
    inject,
    injectable
} from "microinject";

import {
    JsonObjectSerializable
} from "../interfaces";

import {
    DataReader
} from "../data-reader";

import {
    TypeTemplateRegistry
} from "../type-templates";

import {
    OniSaveHeader
} from "../save-header";

import {
    OniGameState
} from "../game-state";

import {
    OniSaveData
} from "./services";


@injectable(OniSaveData)
@asScope(OniSaveData)
export class OniSaveDataImpl implements OniSaveData, JsonObjectSerializable {

    constructor(
        @inject(OniSaveHeader) public header: OniSaveHeader,
        @inject(TypeTemplateRegistry) public templates: TypeTemplateRegistry,
        @inject(OniGameState) public gameState: OniGameState
    ) {}

    parse(reader: DataReader) {
        this.header.parse(reader);
        this.templates.parse(reader);
        this.gameState.parse(reader);
    }

    toJSON() {
        return {
            header: this.header
        };
    }
}