
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


let containerModule: ContainerModule | null = null;

// TODO: return SaveGame, not SaveGameInstance.
export function parseSaveGame(data: ArrayBuffer): SaveGameInstance {
    const container = new Container();
    if (!containerModule) {
        containerModule = createModule();
    }
    container.load(containerModule);
    const save = container.get(SaveGameInstance);
    const reader = new ArrayDataReader(data);
    save.parse(reader);
    return save;
}

// TODO: accept SaveGame, not SaveGameInstance.
export function writeSaveGame(save: SaveGameInstance): ArrayBuffer {
    const writer = new ArrayDataWriter();
    save.write(writer);
    return writer.getBytes();
}