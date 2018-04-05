import { Identifier } from "microinject";
import { Logger } from "./services";
export interface ConsoleLoggerConfig {
    trace: boolean;
    warn: boolean;
}
export declare const ConsoleLoggerConfig: Identifier<ConsoleLoggerConfig>;
export declare const defaultConsoleLoggerConfig: ConsoleLoggerConfig;
export declare class ConsoleLoggerImpl implements Logger {
    private _config;
    constructor(_config: ConsoleLoggerConfig);
    trace(str: string): void;
    warn(str: string): void;
}
