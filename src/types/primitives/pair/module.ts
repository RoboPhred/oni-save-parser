
import {
    ContainerModule
} from "microinject";

import {
    PairTypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(PairTypeSerializer)
    });
}