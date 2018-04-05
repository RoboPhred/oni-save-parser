
import {
    ContainerModule
} from "microinject";

import {
    OniGameStateManagerImpl
} from "./game-state";

export function createModule() {
    return new ContainerModule(bind => {
        bind(OniGameStateManagerImpl);
    });
}