import {
    ContainerModule,
    composeModules
} from "microinject";

import {
    createModule as createLoggingModule
} from "../logging";

import {
    createModule as createSaveDataModule
} from "../save-data";

import {
    createModule as createSaveHeaderModule
} from "../save-header";

import {
    createModule as createTypeTemplateModule
} from "../type-templates";

import {
    createModule as createGameStateModule
} from "../game-state";


export default composeModules(
    createLoggingModule(),
    createSaveDataModule(),
    createSaveHeaderModule(),
    createTypeTemplateModule(),
    createGameStateModule()
);