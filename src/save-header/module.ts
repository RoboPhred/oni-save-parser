
import {
    ContainerModule
} from "microinject";

import {
    OniSaveHeaderImpl
} from "./header";

export function createModule() {
    return new ContainerModule(bind => {
        bind(OniSaveHeaderImpl);
    });
}