
import {
    ContainerModule
} from "microinject";

import {
    OniGameStateImpl
} from "./game-state";

export function createModule() {
    return new ContainerModule(bind => {
        bind(OniGameStateImpl);
    });
}