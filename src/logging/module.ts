
import {
    ContainerModule
} from "microinject";

import {
    ConsoleLoggerConfig,
    ConsoleLoggerImpl,
    defaultConsoleLoggerConfig
} from "./console-logger";


export function createModule(config?: Partial<ConsoleLoggerConfig>) {
    return new ContainerModule(bind => {
        bind(ConsoleLoggerConfig).toConstantValue<ConsoleLoggerConfig>({
            ...defaultConsoleLoggerConfig,
            ...(config || {})
        });
        bind(ConsoleLoggerImpl);
    });
}
