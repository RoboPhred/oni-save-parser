import { Identifier } from "microinject";
export interface Logger {
    trace(str: string): void;
}
export declare const Logger: Identifier<Logger>;
