
import {
    ContainerModule
} from "microinject";

import {
    TypeTemplateRegistryImpl
} from "./template-registry";


export function createModule() {
    return new ContainerModule(bind => {
        bind(TypeTemplateRegistryImpl);
    });
}