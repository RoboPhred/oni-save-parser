
import {
    ContainerModule
} from "microinject";

import {
    SingleTypeSerializer
} from "./serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(SingleTypeSerializer)
    });
}