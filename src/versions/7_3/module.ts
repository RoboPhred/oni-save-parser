
import {
    ContainerModule,
    composeModules
} from "microinject";


import {
    createModule as createTypesModule
} from "./type-serializer/module";


import { GameObjectManagerImpl } from "./implementations/game-object-manager";
import { GameSaveDataInstanceImpl } from "./implementations/game-save-data";
import { GameSaveRootInstanceImpl } from "./implementations/game-save-root";
import { GameSettingsInstanceImpl } from "./implementations/game-settings";
import { SaveBodyInstanceImpl } from "./implementations/save-body";
import { SaveGameHeaderInstanceImpl } from "./implementations/save-game-header";
import { SaveGameInstanceImpl } from "./implementations/save-game";


export function createModule() {
    return composeModules(
        createTypesModule(),
        new ContainerModule(bind => {
            bind(GameObjectManagerImpl);
            bind(GameSaveDataInstanceImpl);
            bind(GameSaveRootInstanceImpl);
            bind(GameSettingsInstanceImpl);
            bind(SaveBodyInstanceImpl);
            bind(SaveGameHeaderInstanceImpl);
            bind(SaveGameInstanceImpl);
        })
    );
} 