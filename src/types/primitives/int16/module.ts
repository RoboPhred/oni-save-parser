
import {
    ContainerModule
} from "microinject";

import {
    Int16TypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(Int16TypeSerializer)
    });
}