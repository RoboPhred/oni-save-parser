
import {
    ContainerModule
} from "microinject";

import {
    ByteTypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(ByteTypeSerializer)
    });
}