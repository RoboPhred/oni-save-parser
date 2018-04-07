
import {
    ContainerModule
} from "microinject";

import {
    Int64TypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(Int64TypeSerializer)
    });
}