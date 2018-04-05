import {
    ContainerModule
} from "microinject";

import {
    OniSaveRootImpl
} from "./save-root";

export function createModule() {
    return new ContainerModule(bind => {
        bind(OniSaveRootImpl);
    });
}