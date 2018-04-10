
import {
    ContainerModule
} from "microinject";

import {
    SByteTypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(SByteTypeSerializer)
    });
}