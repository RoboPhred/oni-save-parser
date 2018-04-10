
import {
    ContainerModule
} from "microinject";

import {
    Vector3TypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(Vector3TypeSerializer)
    });
}