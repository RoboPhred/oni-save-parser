
import {
    ContainerModule
} from "microinject";

import {
    OniSaveImpl
} from "./save";

export function createModule() {
    return new ContainerModule(bind => {
        bind(OniSaveImpl);
    });
}