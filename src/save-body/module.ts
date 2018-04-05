
import {
    ContainerModule
} from "microinject";

import {
    OniSaveBodyImpl
} from "./save-body";

export function createModule() {
    return new ContainerModule(bind => {
        bind(OniSaveBodyImpl);
    });
}
