
import {
    ContainerModule
} from "microinject";

import {
    StringTypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(StringTypeSerializer)
    });
}