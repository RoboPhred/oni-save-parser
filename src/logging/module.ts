
import {
    ContainerModule
} from "microinject";

import {
    LoggerImpl
} from "./logger";


export function createModule() {
    return new ContainerModule(bind => {
        bind(LoggerImpl);
    });
}
