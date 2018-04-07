
import {
    ContainerModule
} from "microinject";

import {
    UInt32TypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(UInt32TypeSerializer)
    });
}