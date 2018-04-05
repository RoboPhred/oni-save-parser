import {
    ContainerModule,
    composeModules
} from "microinject";


// TODO: Export a set of prebuild composed modules
//  for different breaking-change save file versions.

import {
    createModule as createLoggingModule
} from "../../logging/module";

import {
    createModule as createSaveModule
} from "../../oni-save/module";

import {
    createModule as createSaveHeaderModule
} from "../../save-header/module";

import {
    createModule as createTypeTemplateModule
} from "../../type-templates/module";

import {
    createModule as createSaveBodyModule
} from "../../save-body/module";

import {
    createModule as createSaveRootModule
} from "../../save-root/module";

import {
    createModule as createGameSettingsModule
} from "../../game-settings/module";

import {
    createModule as createGameStateModule
} from "../../game-state/module";


export default composeModules(
    createLoggingModule(),
    createSaveModule(),
    createSaveHeaderModule(),
    createTypeTemplateModule(),
    createSaveBodyModule(),
    createSaveRootModule(),
    createGameSettingsModule(),
    createGameStateModule()
);