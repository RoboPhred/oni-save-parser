
import {
    ContainerModule
} from "microinject";

import {
    OniSaveDataImpl
} from "./save-data";

export function createModule() {
    return new ContainerModule(bind => {
        bind(OniSaveDataImpl);
    });
}