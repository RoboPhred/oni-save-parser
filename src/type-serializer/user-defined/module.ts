
import {
    ContainerModule
} from "microinject";

import { UserDefinedGenericTypeSerializer } from "./generic/serializer";
import { UserDefinedTypeSerializer } from "./nongeneric/serializer";

export function createModule() {
    return new ContainerModule(bind => {
        bind(UserDefinedGenericTypeSerializer);
        bind(UserDefinedTypeSerializer);
    });
}