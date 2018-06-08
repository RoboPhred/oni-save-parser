import { Container, ContainerModule, composeModules } from "microinject";

import { ArrayDataReader, ArrayDataWriter } from "../../binary-serializer";

import { SaveGameInstance } from "./services";

import { createModule } from "./module";

import { SaveGame } from "./interfaces";

let containerModule: ContainerModule | null = null;

export function parseSaveGame(
  data: ArrayBuffer,
  injectModule?: ContainerModule
): SaveGame {
  const container = new Container();
  if (!containerModule) {
    containerModule = createModule();
  }

  const useModule = injectModule
    ? composeModules(containerModule, injectModule)
    : containerModule;
  container.load(useModule);

  const save = container.get(SaveGameInstance);
  const reader = new ArrayDataReader(data);
  save.parse(reader);
  return save.toJSON();
}

export function writeSaveGame(
  save: SaveGame,
  injectModule?: ContainerModule
): ArrayBuffer {
  const container = new Container();
  if (!containerModule) {
    containerModule = createModule();
  }

  const useModule = injectModule
    ? composeModules(containerModule, injectModule)
    : containerModule;
  container.load(useModule);

  const saveInstance = container.get(SaveGameInstance);
  const writer = new ArrayDataWriter();

  saveInstance.fromJSON(save);
  saveInstance.write(writer);
  return writer.getBytes();
}
