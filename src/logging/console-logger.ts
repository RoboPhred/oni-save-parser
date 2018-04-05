
import {
    Identifier,
    inject,
    injectable,
    singleton
} from "microinject";

import {
    Logger
} from "./services";


export interface ConsoleLoggerConfig {
    trace: boolean;
    warn: boolean;
}
export const ConsoleLoggerConfig: Identifier<ConsoleLoggerConfig> = Symbol("ConsoleLoggerConfig");
export const defaultConsoleLoggerConfig: ConsoleLoggerConfig = {
    trace: false,
    warn: true
};


@injectable(Logger)
@singleton()
export class ConsoleLoggerImpl implements Logger {

    constructor (
        @inject(ConsoleLoggerConfig) private _config: ConsoleLoggerConfig
    ) {}

    trace(str: string): void {
        if (!this._config.trace) return;
        console.log(str);
    }
    warn(str: string): void {
        if (!this._config.warn) return;
        console.warn(str);
    }
}