
import {
    Container,
    ContainerModule
} from "microinject";

import {
    ArrayDataReader,
    ArrayDataWriter
} from "../../binary-serializer";

import {
    SaveGameInstance
} from "./services";

import { createModule } from "./module";

import { SaveGame } from "./interfaces";


let containerModule: ContainerModule | null = null;

// TODO: return SaveGame, not SaveGameInstance.
export function parseSaveGame(data: ArrayBuffer): SaveGame {
    const container = new Container();
    if (!containerModule) {
        containerModule = createModule();
    }
    container.load(containerModule);
    const save = container.get(SaveGameInstance);
    const reader = new ArrayDataReader(data);
    save.parse(reader);
    return save.toJSON();
}

export function writeSaveGame(save: SaveGame): ArrayBuffer {
    const container = new Container();
    if (!containerModule) {
        containerModule = createModule();
    }
    container.load(containerModule);
    const saveInstance = container.get(SaveGameInstance);
    const writer = new ArrayDataWriter();
    
    saveInstance.fromJSON(save);
    saveInstance.write(writer);
    return writer.getBytes();
}