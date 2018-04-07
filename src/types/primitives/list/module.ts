
import {
    ContainerModule
} from "microinject";

import {
    ListTypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(ListTypeSerializer)
    });
}