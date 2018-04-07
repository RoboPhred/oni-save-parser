
import {
    ContainerModule
} from "microinject";

import {
    OniGameDataImpl
} from "./game-data";


export function createModule() {
    return new ContainerModule(bind => {
        bind(OniGameDataImpl);
    });
}