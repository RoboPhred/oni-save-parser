
import {
    Identifier
} from "microinject";

export interface Logger {
    trace(str: string): void;
    warn(str: string): void;
}
export const Logger: Identifier<Logger> = Symbol("Logger");