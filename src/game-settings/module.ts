
import {
    ContainerModule
} from "microinject";

import {
    OniGameSettingsImpl
} from "./game-settings";


export function createModule() {
    return new ContainerModule(bind => {
        bind(OniGameSettingsImpl);
    });
}