
import {
    ContainerModule
} from "microinject";

import {
    ParseStepExecutorImpl
} from "./step-executor";


export function createModule() {
    return new ContainerModule(bind => {
        bind(ParseStepExecutorImpl);
    });
}
